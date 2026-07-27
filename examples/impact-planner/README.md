# Impact Planner

Impact Planner is an offline dependency-impact workspace. It stores one versioned
workspace in local storage, validates every change through the codec and graph
modules, and serves only its declared local assets.

## Run

```powershell
npm.cmd start
```

Open `http://127.0.0.1:4175`.

## Verify

```powershell
npm.cmd test
npm.cmd run check
```

The test command runs the codec, graph, storage, interface, integration, and
server suites. No package installation is required.
