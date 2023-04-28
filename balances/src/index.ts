import express, { Request, Response } from 'express';
import { MysqlAccountRepository } from './infra/repository/mysql-account.repository';
import { GetAccountUseCase } from './app/use-case/get-account.use-case';
import { UpdateAccountUseCase } from './app/use-case/update-account.use-case';
import { RabbitMQAdapter } from './infra/queue/rabbit-mq-adapter.queue';

type BalancesPayload = {
  account_id_from: string;
  account_id_to: string;
  balance_account_id_from: number;
  balance_account_id_to: number;
};

async function main() {
  const accountRepository = new MysqlAccountRepository();
  const getAccountUseCase = new GetAccountUseCase(accountRepository);
  const updateAccountUseCase = new UpdateAccountUseCase(accountRepository);

  const queue = new RabbitMQAdapter();
  await queue.connect();

  queue.on('balances', async function (input: BalancesPayload) {
    await updateAccountUseCase.execute([
      { id: input.account_id_from, balance: input.balance_account_id_from },
      { id: input.account_id_to, balance: input.balance_account_id_to },
    ]);
  });

  const app = express();
  app.get('/balances/:account_id', async (req: Request, res: Response) => {
    const { account_id } = req.params;
    try {
      const account = await getAccountUseCase.execute({ id: account_id });
      res.json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app.listen(3000, () => console.log(`Listening on port ${3000}`));
}

main();
