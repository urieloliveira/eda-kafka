import {
  CreateTransactionInput,
  CreateTransactionOutput,
  CreateTransactionOutputMapper,
} from '../dto/create-transaction.dto';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { UnitOfWork } from 'infra/uow/uow.interface';
import { MysqlUnitOfWork } from 'infra/uow/mysql.uow';

export class CreateTransactionUseCase {
  #uow: UnitOfWork;
  constructor(uow: UnitOfWork) {
    this.#uow = uow;
  }
  async execute(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = new Transaction({
      from_id: input.account_id_from,
      to_id: input.account_id_to,
      amount: input.amount,
    });
    await this.#uow.do(async () => {
      const transactionRepository: TransactionRepository =
        this.#uow.getRepository('transactionRepository');
      await transactionRepository.create(transaction);
    });
    return CreateTransactionOutputMapper.toOutput(transaction);
  }
}
