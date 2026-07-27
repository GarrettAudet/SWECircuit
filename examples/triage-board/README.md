# Issue Triage Board

A dependency-free browser application for creating, filtering, moving, importing, exporting, and
persisting local issues. Data remains in the browser's local storage; the application makes no
external requests.

## Run

From this directory:

```powershell
node server.mjs
```

Open `http://127.0.0.1:4173`. Set `PORT` before starting the server to use another local port.

## Verify

Run the deterministic domain and storage tests:

```powershell
node --test test/model.test.mjs test/storage.test.mjs
```

Run JavaScript syntax checks:

```powershell
node --check src/app.js
node --check server.mjs
```

No dependency installation, backend, account, or network connection is required.
