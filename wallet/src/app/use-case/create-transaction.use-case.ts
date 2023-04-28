import {
  CreateTransactionInput,
  CreateTransactionOutput,
  CreateTransactionOutputMapper,
} from '../dto/create-transaction.dto';
import { BalanceUpdatedOutputMapper } from '../dto/balance-updated.dto';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { UnitOfWork } from '../../infra/uow/uow.interface';
import { Queue } from '../../infra/queue/queue.interface';

export class CreateTransactionUseCase {
  #uow: UnitOfWork;
  #queue: Queue;
  constructor(uow: UnitOfWork, queue: Queue) {
    this.#uow = uow;
    this.#queue = queue;
  }
  async execute(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    let transaction: Transaction;
    await this.#uow.do(async () => {
      const transactionRepository: TransactionRepository =
        this.#uow.getRepository('transactionRepository');
      const accountRepository = this.#uow.getRepository('accountRepository');

      const accountFrom = await accountRepository.findById(
        input.account_id_from,
      );
      const accountTo = await accountRepository.findById(input.account_id_to);

      transaction = new Transaction({
        account_from: accountFrom,
        account_to: accountTo,
        amount: input.amount,
      });

      await accountRepository.update(accountFrom);
      await accountRepository.update(accountTo);
      await transactionRepository.create(transaction);
    });
    const output = CreateTransactionOutputMapper.toOutput(transaction);
    const balanceUpdatedOutput =
      BalanceUpdatedOutputMapper.toOutput(transaction);
    if (this.#queue) {
      await this.#queue.publish('transactions', 'TransactionCreated', output);
      await this.#queue.publish(
        'balances',
        'BalanceUpdated',
        balanceUpdatedOutput,
      );
    }
    return output;
  }
}
