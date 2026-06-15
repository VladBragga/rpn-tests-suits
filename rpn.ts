import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.post('/api/v1/evaluate', (req: Request, res: Response): any => {
  const { expression } = req.body;

  const tokens = expression.split(' ');
  const stack: number[] = [];

  for (let token of tokens) {
    if (!token) continue;

    if (!isNaN(Number(token))) {
      stack.push(Number(token));
    } else if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  }

  return res.status(200).json({ result: stack[0] });
});

export default app;
