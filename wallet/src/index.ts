import express, { Request, Response } from 'express';
import { MysqlAccountRepository } from './infra/repository/mysql-account.repository';
import { MysqlClientRepository } from './infra/repository/mysql-client.repository';
import { MysqlTransactionRepository } from './infra/repository/mysql-transaction.repository';
import { CreateAccountUseCase } from './app/use-case/create-account.use-case';
import { CreateClientUseCase } from './app/use-case/create-client.use-case';
import { CreateTransactionUseCase } from './app/use-case/create-transaction.use-case';
import { KafkaAdapter } from './infra/queue/kafka-adapter.queue';
import { MysqlUnitOfWork } from './infra/uow/mysql.uow';
import bodyParser from 'body-parser';

async function main() {
  const queue = new KafkaAdapter();
  await queue.connect();

  const accountRepository = new MysqlAccountRepository();
  const clientRepository = new MysqlClientRepository();
  const transactionRepository = new MysqlTransactionRepository();

  const uow = new MysqlUnitOfWork();
  uow.register('accountRepository', accountRepository);
  uow.register('clientRepository', clientRepository);
  uow.register('transactionRepository', transactionRepository);

  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  const createClientUseCase = new CreateClientUseCase(clientRepository);
  const createTransactionUseCase = new CreateTransactionUseCase(uow, queue);

  const app = express();
  app.use(bodyParser.json());

  app.post('/clients', async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const client = await createClientUseCase.execute({ name, email });
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/accounts', async (req: Request, res: Response) => {
    try {
      const { client_id } = req.body;
      const account = await createAccountUseCase.execute({ client_id });
      res.json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post('/transactions', async (req: Request, res: Response) => {
    try {
      const { account_id_from, account_id_to, amount } = req.body;
      const transaction = await createTransactionUseCase.execute({
        account_id_from,
        account_id_to,
        amount,
      });
      res.json(transaction);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  app.listen(3000, () => console.log(`Listening on port ${3000}`));
}

main();
