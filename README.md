# RPN Calculator — QA / SDET Interview Exercise

[![Tests](https://img.shields.io/badge/tests-30%20passing-brightgreen)](./TESTSUITS.md)

A tiny Express HTTP API that evaluates [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) expressions.

Your task during the interview: **write tests for this service**. Pick whatever test runner / HTTP client / framework you're comfortable with (Jest, Vitest, Mocha + supertest, Playwright API tests, Postman/Newman, plain `curl` scripts — anything goes). Be ready to talk through *what* you chose to cover and *why*.

---

## Prerequisites

- **Node.js 18+** (tested on Node 20 and 24)
- **npm** (bundled with Node)

Check your versions:

```bash
node --version
npm --version
```

## Setup

From this directory:

```bash
npm install
```

## Run the API

```bash
npm start
```

You should see:

```
RPN calculator API listening on http://localhost:3000
```

The server defaults to port `3000`. Override with `PORT=4000 npm start` if needed.

For auto-reload while editing:

```bash
npm run dev
```

## The endpoint

**`POST /api/v1/evaluate`**

Request body (JSON):

```json
{ "expression": "2 3 +" }
```

Response:

```json
{ "result": 5 }
```

### Quick smoke test

```bash
# Simple addition  → 5
curl -s -X POST http://localhost:3000/api/v1/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"expression":"2 3 +"}'

# Classic RPN example  → 14
curl -s -X POST http://localhost:3000/api/v1/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"expression":"5 1 2 + 4 * + 3 -"}'
```

## How RPN works (quick refresher)

Operands first, operator after. The operator consumes the previous two numbers from the stack.

| Infix         | RPN              |
|---------------|------------------|
| `2 + 3`       | `2 3 +`          |
| `(1 + 2) * 4` | `1 2 + 4 *`      |
| `5 + ((1+2)*4) - 3` | `5 1 2 + 4 * + 3 -` |

Supported operators: `+`, `-`, `*`, `/`. Tokens are whitespace-separated.

---

## Your task

1. Read `rpn.ts` and the API description above.
2. Decide what behaviours are worth testing (happy paths, edge cases, error handling, input validation, etc.).
3. Add a test suite to this project. Feel free to add dependencies and a `test` script in `package.json`.
4. Run your tests. Be prepared to discuss:
   - What you covered and what you intentionally skipped.
   - Anything you'd flag to the developer as a defect.
   - How you'd extend the suite if you had more time.

There is no fixed "right answer" — we're interested in how you think about coverage, structure, and risk.

## Project layout

```
.
├── rpn.ts          # The service under test (do not modify unless asked)
├── server.ts       # Boots the Express app on $PORT (default 3000)
├── package.json
├── tsconfig.json
└── README.md
```

Good luck — and have fun!
