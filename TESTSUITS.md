# Test Suite

Tests for the RPN calculator API (`POST /api/v1/evaluate`).

## Stack

| Tool | Role |
|------|------|
| **Jest** | Test runner & assertions (`expect`) |
| **ts-jest** | Runs the TypeScript specs without a build step |
| **supertest** | Drives the Express `app` in-process — no server/port needed |

Run:

```bash
npm test
```

No `npm start` required — supertest calls the app directly, so there is no
listening server to boot.

## Layout

```
tests/
├── request.ts                  # supertest helpers (evaluateRequest, postRaw)
├── input-validation.spec.ts    # request shape / payload validation
├── single-operator.spec.ts     # one operator at a time
├── operator-semantics.spec.ts  # operator order, decimals, precision
├── expressions.spec.ts         # larger / nested expressions
├── edge-cases.spec.ts          # evaluation edge cases & known bugs
└── routing.spec.ts             # HTTP method / unknown routes
```

## Scenarios

### Input validation
| Input | Expected | Actual |
|-------|----------|--------|
| Malformed JSON body | 400 | 400 ✅ |
| Missing `expression` field | 400 | **500** 🐞 |
| `expression` is a number | 400 | **500** 🐞 |
| `expression` is an array | 400 | **500** 🐞 |
| `expression` is null | 400 | **500** 🐞 |
| Missing JSON `Content-Type` | 400/415 | **500** 🐞 |

### Single operator (happy path)
`2 3 +` → 5 · `5 3 -` → 2 · `5 3 *` → 15 · `6 3 /` → 2

### Operator semantics
| Input | Expected |
|-------|----------|
| `10 4 -` | 6 (left-to-right) |
| `20 4 /` | 5 (left-to-right) |
| `7 2 /` | 3.5 (non-integer) |
| `-3 2 +` | -1 (negative literal) |
| `1.5 2.5 +` | 4 (decimals) |
| `0.1 0.2 +` | 0.30000000000000004 (IEEE-754, no rounding) |

### Larger / nested expressions
`1 2 + 4 *` → 12 · `2 3 4 5 6 + + + +` → 20 · `100 5 / 3 * 4 - 2 +` → 58 · `2   3   +` → 5 (extra spaces)

### Edge cases & known bugs
| Input | Expected | Actual |
|-------|----------|--------|
| `5 0 /` (divide by zero) | error | 200 `{result:null}` 🐞 |
| `2 +` (too few operands) | error | 200 `{result:null}` 🐞 |
| `+` (lone operator) | error | 200 `{result:null}` 🐞 |
| `2 3` (too many operands) | error | 200 `{result:2}` 🐞 |
| `2 3 %` (unknown operator) | error | 200 `{result:2}` 🐞 |
| `a b +` (non-numeric tokens) | error | 200 `{result:null}` 🐞 |
| `""` (empty) | error | 200 `{}` 🐞 |
| `"   "` (whitespace only) | error | 200 `{}` 🐞 |

### Routing
`GET /api/v1/evaluate` → 404 · `POST /api/v1/nope` → 404

## Defects summary

The API does **no input validation** and **never returns a 4xx for bad
expressions**. Invalid input either:

- crashes with **500** and leaks an HTML stack trace (bad request shape), or
- returns **200** with a wrong / `null` / missing result (bad expression).
