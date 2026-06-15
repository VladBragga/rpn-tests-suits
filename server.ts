import app from './rpn';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`RPN calculator API listening on http://localhost:${PORT}`);
});
