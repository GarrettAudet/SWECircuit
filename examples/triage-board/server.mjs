import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const ROUTES = new Map([
  ["/", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { file: "index.html", type: "text/html; charset=utf-8" }],
  ["/styles.css", { file: "styles.css", type: "text/css; charset=utf-8" }],
  ["/src/app.js", { file: "src/app.js", type: "text/javascript; charset=utf-8" }],
  ["/src/model.js", { file: "src/model.js", type: "text/javascript; charset=utf-8" }],
  ["/src/storage.js", { file: "src/storage.js", type: "text/javascript; charset=utf-8" }]
]);

const SECURITY_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'none'; connect-src 'none'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self'; style-src 'self'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff"
});

function send(response, status, body, headers = {}) {
  response.writeHead(status, {
    ...SECURITY_HEADERS,
    "Content-Length": Buffer.byteLength(body),
    ...headers
  });
  response.end(body);
}

export function createTriageBoardServer() {
  return createServer(async (request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      send(response, 405, "Method not allowed\n", {
        Allow: "GET, HEAD",
        "Content-Type": "text/plain; charset=utf-8"
      });
      return;
    }

    let pathname;
    try {
      pathname = new URL(request.url, "http://127.0.0.1").pathname;
    } catch {
      send(response, 400, "Bad request\n", {
        "Content-Type": "text/plain; charset=utf-8"
      });
      return;
    }

    const route = ROUTES.get(pathname);
    if (!route) {
      send(response, 404, "Not found\n", {
        "Content-Type": "text/plain; charset=utf-8"
      });
      return;
    }

    try {
      const body = await readFile(join(ROOT, route.file));
      response.writeHead(200, {
        ...SECURITY_HEADERS,
        "Content-Length": body.length,
        "Content-Type": route.type
      });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      send(response, 500, "Unable to read application file\n", {
        "Content-Type": "text/plain; charset=utf-8"
      });
    }
  });
}

function startServer() {
  const port = Number.parseInt(process.env.PORT ?? "4173", 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError("PORT must be an integer from 1 through 65535");
  }

  const server = createTriageBoardServer();
  server.on("clientError", (_error, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n");
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Issue triage board: http://127.0.0.1:${port}`);
  });
}

const invokedFile = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (import.meta.url === invokedFile) {
  startServer();
}
