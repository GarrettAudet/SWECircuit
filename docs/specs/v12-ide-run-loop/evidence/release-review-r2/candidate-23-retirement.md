# Candidate 23 Retirement

## Candidate

V12 Revision 46 commit `dbe690e74746b8a72202f8fa6146b056cf305813`, tree `115475c67e56d0ffcbe9934c08c07657e7e18b42`.

## Verification Outcome

The exact copied-production lifecycle ran for 207.5 seconds. External scratch and all earlier authority boundaries passed. The R2 prepare worker then rejected one bound supply: `npmScriptShell`.

## Root Cause

On Windows, startup `realpathSync` preserved the environment's path casing while asynchronous receipt binding returned canonical filesystem casing for the same `cmd.exe` file.

## Retirement

No candidate-addressed Revision 46 canonical gate was consumed. Candidate 23 is retired. Revision 47 canonicalizes startup authority through native realpath and retains strict exact comparison.