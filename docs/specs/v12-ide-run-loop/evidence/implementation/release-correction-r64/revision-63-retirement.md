# Revision 63 Retirement

## Candidate

- Commit: `7f45e75792caff01db638538004077b61643ea37`.
- Tree: `263d95fdcf263226ee74fdcfc45a12d464c593dd`.
- One-shot canonical gate: never invoked.

## Exact Local Results

- Copied-production lifecycle: 2/2 `pass` in 524.7 seconds.
- Complete `npm.cmd run verify`: `pass` in 609.3 seconds.
- Strict V11 dogfood, focused release tests, core tests, template checker, checker mutation matrix,
  and independent review: `pass`.

## Hosted Result

Hosted run
[30156840253](https://github.com/GarrettAudet/SWECircuit/actions/runs/30156840253)
completed against the exact candidate commit:

- Six Node 22/24 kernel jobs across Linux, Windows, and macOS: `pass`.
- Template checker and checker regression steps: `pass`.
- `Check tracked whitespace`: `fail`.

## Failure

The exact R61 stdout evidence was tracked as `.txt` and contains seven intentional
trailing-whitespace lines. The hosted policy exempts immutable `.log` evidence, but scans `.txt`.

## Disposition

Revision 63 is permanently retired. Its passing local and kernel results do not override the
failed hosted aggregate, and its unused one-shot gate must never be invoked.
