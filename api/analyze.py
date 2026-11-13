"""CSV analysis endpoint for Vercel and local development."""

from __future__ import annotations

import csv
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import io
import json
import logging
from urllib.parse import parse_qs, urlsplit

import pandas as pd

from analysis_agent.core import AnalysisError, DataAnalysisAgent


MAX_FILE_BYTES = 1024 * 1024
MAX_ROWS = 10_000
MAX_COLUMNS = 50
MAX_COLUMN_NAME_LENGTH = 120

agent = DataAnalysisAgent()
logger = logging.getLogger(__name__)


def parse_csv(body: bytes) -> pd.DataFrame:
    try:
        csv_text = body.decode("utf-8-sig")
    except UnicodeDecodeError as exc:
        raise AnalysisError("Save the CSV as UTF-8 and try again.") from exc
    if "\0" in csv_text:
        raise AnalysisError("The file contains invalid CSV characters.")

    rows = csv.reader(io.StringIO(csv_text, newline=""), strict=True)
    normalised = io.StringIO(newline="")
    writer = csv.writer(normalised)
    try:
        header = next((row for row in rows if row and not (len(row) == 1 and row[0].isspace())), [])
        columns = [cell.strip() for cell in header]
        if not columns:
            raise AnalysisError("The CSV needs a header and at least one data row.")
        if len(columns) > MAX_COLUMNS:
            raise AnalysisError(f"The CSV can have up to {MAX_COLUMNS} columns.")
        if any(
            not column
            or len(column) > MAX_COLUMN_NAME_LENGTH
            or not column.isprintable()
            for column in columns
        ):
            raise AnalysisError("Use non-empty, printable column names of up to 120 characters.")
        if len(set(columns)) != len(columns):
            raise AnalysisError("Give each CSV column a unique name.")

        writer.writerow(columns)
        data_rows = 0
        for row in rows:
            if not row or (len(row) == 1 and row[0].isspace()):
                continue
            if len(row) != len(columns):
                raise AnalysisError("Each CSV row must have the same number of fields as the header.")
            data_rows += 1
            if data_rows > MAX_ROWS:
                raise AnalysisError(f"The CSV can have up to {MAX_ROWS:,} data rows.")
            writer.writerow(row)
    except csv.Error as exc:
        raise AnalysisError("The file could not be read as a comma-separated CSV.") from exc

    if data_rows == 0:
        raise AnalysisError("The CSV needs a header and at least one data row.")
    try:
        normalised.seek(0)
        return pd.read_csv(normalised, header=0, names=columns, skip_blank_lines=False)
    except (pd.errors.ParserError, pd.errors.EmptyDataError, ValueError) as exc:
        raise AnalysisError("The file could not be read as a comma-separated CSV.") from exc


class handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        self.respond(405, {"error": "Upload a CSV using POST."}, allow="POST")

    def do_POST(self) -> None:
        try:
            request = urlsplit(self.path)
            content_type = self.headers.get("Content-Type", "").split(";", 1)[0].strip().lower()
            if content_type != "text/csv":
                self.respond(415, {"error": "Upload a CSV with the text/csv content type."})
                return
            try:
                length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                length = 0
            if length <= 0:
                self.respond(400, {"error": "Select a non-empty CSV to upload."})
                return
            if length > MAX_FILE_BYTES:
                self.respond(413, {"error": "Choose a CSV of 1 MiB or less."})
                return

            query = parse_qs(request.query, keep_blank_values=True, max_num_fields=2)
            if query.keys() - {"x", "y"} or any(len(values) != 1 for values in query.values()):
                raise AnalysisError("Choose at most one X column and one Y column.")
            x = query["x"][0] if "x" in query else None
            y = query["y"][0] if "y" in query else None
            body = self.rfile.read(length)
            if len(body) != length:
                raise AnalysisError("The CSV upload was incomplete. Try again.")
            result = agent.run(parse_csv(body), x, y)
        except (AnalysisError, ValueError) as exc:
            message = str(exc) if isinstance(exc, AnalysisError) else "Check the analysis options and try again."
            self.respond(400, {"error": message})
        except Exception as exc:
            logger.error("CSV analysis failed: %s", type(exc).__name__)
            self.respond(500, {"error": "The analysis could not be completed. Try again."})
        else:
            self.respond(200, result)

    def respond(self, status: int, payload: dict, allow: str | None = None) -> None:
        body = json.dumps(payload, ensure_ascii=False, allow_nan=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if allow is not None:
            self.send_header("Allow", allow)
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args) -> None:
        # Query parameters can contain user-provided column names.
        pass


if __name__ == "__main__":
    address = ("127.0.0.1", 5328)
    with ThreadingHTTPServer(address, handler) as server:
        print(f"CSV analysis endpoint listening at http://{address[0]}:{address[1]}/api/analyze")
        server.serve_forever()
