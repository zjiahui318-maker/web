"""In-memory adaptation of the Simple Data Analysis Agent's CLI tools.

Source: https://github.com/zjiahui318-maker/simple-data-analysis-agent
"""

from __future__ import annotations

from dataclasses import dataclass
from itertools import chain, combinations
import math

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split


MAX_CHART_POINTS = 1_000
MAX_HEATMAP_COLUMNS = 12
MIN_REGRESSION_ROWS = 5


class AnalysisError(ValueError):
    """An analysis input problem the visitor can correct."""


@dataclass
class ProfileResult:
    rows: int
    columns: int
    missing_values: int
    numeric_columns: list[str]

    def payload(self) -> dict:
        return {
            "rows": self.rows,
            "columns": self.columns,
            "missingValues": self.missing_values,
            "numericColumns": self.numeric_columns,
        }


@dataclass
class RegressionResult:
    train_r2: float | None
    test_r2: float | None
    rmse: float
    mae: float
    intercept: float
    coefficient: float
    train_rows: int
    test_rows: int
    predictions: np.ndarray

    def payload(self) -> dict:
        return {
            "trainR2": self.train_r2,
            "testR2": self.test_r2,
            "rmse": self.rmse,
            "mae": self.mae,
            "intercept": self.intercept,
            "coefficient": self.coefficient,
            "trainRows": self.train_rows,
            "testRows": self.test_rows,
        }


class DataProfileTool:
    def run(self, df: pd.DataFrame) -> ProfileResult:
        return ProfileResult(
            rows=len(df),
            columns=len(df.columns),
            missing_values=int(df.isna().sum().sum()),
            numeric_columns=df.select_dtypes(include=[np.number]).columns.tolist(),
        )


class CorrelationTool:
    def run(self, df: pd.DataFrame, x: str, y: str) -> float | None:
        if len(df) < 2 or df[x].nunique() < 2 or df[y].nunique() < 2:
            return None
        return finite_number(df[[x, y]].corr().iloc[0, 1])


class RegressionTool:
    def run(self, clean: pd.DataFrame, x: str, y: str) -> RegressionResult:
        x_data = clean[[x]]
        y_data = clean[y]
        x_train, x_test, y_train, y_test = train_test_split(
            x_data, y_data, test_size=0.25, random_state=42,
        )
        if x_train[x].nunique() < 2:
            raise AnalysisError("Regression needs variation in the predictor in the training rows.")
        model = LinearRegression()
        try:
            with np.errstate(over="ignore", invalid="ignore"):
                model.fit(x_train, y_train)
                train_pred = model.predict(x_train)
                test_pred = model.predict(x_test)
                predictions = model.predict(x_data)
                rmse = float(np.sqrt(mean_squared_error(y_test, test_pred)))
                mae = float(mean_absolute_error(y_test, test_pred))
                train_r2 = regression_score(y_train, train_pred)
                test_r2 = regression_score(y_test, test_pred)
        except (ValueError, OverflowError, np.linalg.LinAlgError) as exc:
            raise AnalysisError("Regression could not be computed at this numeric scale.") from exc

        intercept = float(model.intercept_)
        coefficient = float(model.coef_[0])
        if not np.isfinite(predictions).all() or not all(
            math.isfinite(value) for value in (rmse, mae, intercept, coefficient)
        ):
            raise AnalysisError("Regression could not be computed at this numeric scale.")

        return RegressionResult(
            train_r2, test_r2, rmse, mae, intercept, coefficient,
            len(x_train), len(x_test), predictions,
        )


class VisualizationTool:
    def run(
        self,
        df: pd.DataFrame,
        numeric_columns: list[str],
        pair: tuple[str, str] | None,
        clean: pd.DataFrame | None,
        regression: RegressionResult | None,
        warnings: list[str],
    ) -> dict:
        labels = list(dict.fromkeys([*(pair or ()), *numeric_columns]))[:MAX_HEATMAP_COLUMNS]
        if len(numeric_columns) > MAX_HEATMAP_COLUMNS:
            warnings.append(f"The heatmap shows up to {MAX_HEATMAP_COLUMNS} numeric columns.")

        matrix = df[labels].corr().to_numpy()
        scatter = []
        fit = []
        if pair is not None and clean is not None:
            x, y = pair
            positions = chart_positions(len(clean))
            x_values = clean[x].to_numpy(dtype=float)[positions]
            y_values = clean[y].to_numpy(dtype=float)[positions]
            scatter = points(x_values, y_values)
            if regression is not None:
                fit = points(y_values, regression.predictions[positions])
            if len(clean) > MAX_CHART_POINTS:
                warnings.append(
                    f"Scatter charts show {MAX_CHART_POINTS:,} of {len(clean):,} usable rows. "
                    "The analysis uses all usable rows."
                )

        return {
            "scatter": scatter,
            "fit": fit,
            "heatmap": {
                "labels": labels,
                "values": [[finite_number(value) for value in row] for row in matrix],
            },
        }


class ReportTool:
    def run(
        self,
        profile: ProfileResult,
        pair: tuple[str, str] | None,
        correlation: float | None,
        regression: RegressionResult | None,
        paired_rows: int,
        warnings: list[str],
    ) -> str:
        columns = ", ".join(markdown_code(column) for column in profile.numeric_columns)
        sections = [
            "# Simple Data Analysis Agent Report",
            "## Data Profile\n\n"
            f"- Rows: {profile.rows:,}\n"
            f"- Columns: {profile.columns:,}\n"
            f"- Missing values: {profile.missing_values:,}\n"
            f"- Numeric columns: {columns or 'None'}",
        ]
        if pair is not None:
            x, y = map(markdown_code, pair)
            sections.append(
                "## Relationship Analysis\n\n"
                f"- X variable: {x}\n"
                f"- Y variable: {y}\n"
                f"- Complete pairs: {paired_rows:,}\n"
                f"- Pearson correlation: {format_number(correlation)}"
            )
            if correlation is not None:
                magnitude = abs(correlation)
                strength = "strong" if magnitude >= 0.7 else "moderate" if magnitude >= 0.4 else "weak"
                direction = "positive" if correlation > 0 else "negative" if correlation < 0 else "zero"
                sections.append(
                    "## Interpretation\n\n"
                    f"The agent found a {strength} association between {x} and {y} "
                    f"({direction} Pearson correlation). Correlation does not establish causation."
                )
        if regression is not None:
            sections.append(
                "## Simple Linear Regression\n\n"
                f"- Formula: {y} = {format_number(regression.intercept)} "
                f"+ ({format_number(regression.coefficient)} × {x})\n"
                f"- Training rows: {regression.train_rows:,}\n"
                f"- Test rows: {regression.test_rows:,}\n"
                f"- Train R²: {format_number(regression.train_r2)}\n"
                f"- Test R²: {format_number(regression.test_r2)}\n"
                f"- Test RMSE: {format_number(regression.rmse)}\n"
                f"- Test MAE: {format_number(regression.mae)}\n\n"
                "The model was fitted on the training rows. "
                "The test metrics use a separate 25% holdout with a fixed random seed."
            )
            if regression.train_r2 is not None and regression.test_r2 is not None:
                if regression.train_r2 - regression.test_r2 > 0.15:
                    sections.append(
                        "The training R² is considerably higher than the test R². "
                        "Check how well the model generalizes before relying on its predictions."
                    )
        if warnings:
            sections.append("## Analysis Notes\n\n" + "\n".join(f"- {note}" for note in warnings))
        return "\n\n".join(sections) + "\n"


class DataAnalysisAgent:
    """Coordinate the CLI agent's statistical tools for an in-memory web run."""

    def __init__(self) -> None:
        self.profile_tool = DataProfileTool()
        self.correlation_tool = CorrelationTool()
        self.regression_tool = RegressionTool()
        self.visualization_tool = VisualizationTool()
        self.report_tool = ReportTool()

    def run(self, df: pd.DataFrame, x: str | None = None, y: str | None = None) -> dict:
        warnings: list[str] = []
        numeric = df.select_dtypes(include=[np.number])
        if np.isinf(numeric.to_numpy(dtype=float)).any():
            df = df.replace([np.inf, -np.inf], np.nan)
            warnings.append("Infinite numeric values were treated as missing.")

        profile = self.profile_tool.run(df)
        pair = choose_variables(df, profile.numeric_columns, x, y)
        clean = None
        correlation = None
        regression = None
        paired_rows = 0
        if pair is not None:
            x, y = pair
            clean = df[[x, y]].dropna()
            paired_rows = len(clean)
            correlation = self.correlation_tool.run(clean, x, y)
            if correlation is None:
                warnings.append("Pearson correlation needs two varying columns with overlapping numeric values.")
            if paired_rows < MIN_REGRESSION_ROWS:
                warnings.append(f"Regression needs at least {MIN_REGRESSION_ROWS} complete X/Y rows.")
            elif clean[x].nunique() < 2:
                warnings.append("Regression needs a predictor with at least two distinct values.")
            else:
                try:
                    regression = self.regression_tool.run(clean, x, y)
                except AnalysisError as exc:
                    warnings.append(str(exc))
                if regression is not None and (regression.train_r2 is None or regression.test_r2 is None):
                    warnings.append("R² is unavailable when the response does not vary or the score is non-finite.")
        else:
            warnings.append("Select two numeric columns with overlapping values to run relationship analysis.")

        charts = self.visualization_tool.run(df, profile.numeric_columns, pair, clean, regression, warnings)
        report = self.report_tool.run(profile, pair, correlation, regression, paired_rows, warnings)
        return {
            "profile": profile.payload(),
            "variables": {"x": pair[0], "y": pair[1]} if pair is not None else None,
            "correlation": correlation,
            "regression": regression.payload() if regression is not None else None,
            "charts": charts,
            "warnings": warnings,
            "report": report,
        }


def choose_variables(
    df: pd.DataFrame, columns: list[str], x: str | None, y: str | None,
) -> tuple[str, str] | None:
    if x is not None or y is not None:
        if x is None or y is None or x == y or x not in columns or y not in columns:
            raise AnalysisError("Choose two different numeric columns for X and Y.")
        return x, y

    default = ("ad_spend", "sales")
    preferred = (default,) if all(column in columns for column in default) else ()
    varying = [column for column in columns if df[column].nunique() >= 2]
    if len(varying) >= 2:
        numeric = df[varying]
        complete_counts = numeric.notna().to_numpy(dtype=np.int32)
        shared_rows = complete_counts.T @ complete_counts
        positions = {column: index for index, column in enumerate(varying)}
        for x, y in chain(preferred, combinations(varying, 2)):
            if x not in positions or y not in positions:
                continue
            if shared_rows[positions[x], positions[y]] < MIN_REGRESSION_ROWS:
                continue
            overlap = numeric[[x, y]].dropna()
            if overlap[x].nunique() >= 2 and overlap[y].nunique() >= 2:
                return x, y

    complete = df[columns].notna().to_numpy()
    positions = {column: index for index, column in enumerate(columns)}
    for x, y in chain(preferred, combinations(columns, 2)):
        if (complete[:, positions[x]] & complete[:, positions[y]]).any():
            return x, y
    return None


def chart_positions(rows: int) -> np.ndarray:
    return np.linspace(0, rows - 1, min(rows, MAX_CHART_POINTS), dtype=int)


def points(x_values: np.ndarray, y_values: np.ndarray) -> list[dict]:
    return [{"x": float(x), "y": float(y)} for x, y in zip(x_values, y_values)]


def finite_number(value: float) -> float | None:
    return float(value) if math.isfinite(value) else None


def regression_score(actual: pd.Series, predicted: np.ndarray) -> float | None:
    if actual.nunique() < 2:
        return None
    return finite_number(r2_score(actual, predicted, force_finite=False))


def format_number(value: float | None) -> str:
    return "Unavailable" if value is None else f"{value:.6g}"


def markdown_code(value: str) -> str:
    value = " ".join(value.splitlines())
    fence = "`"
    while fence in value:
        fence += "`"
    return f"{fence} {value} {fence}"
