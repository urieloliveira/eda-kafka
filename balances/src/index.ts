import express, { Request, Response } from 'express';

const app = express();

app.get('/balances/:account_id', (req: Request, res: Response) => {
  const { account_id } = req.params;
  res.send(`Hello ${account_id}`);
});

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
});
