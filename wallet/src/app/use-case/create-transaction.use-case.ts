import {
  CreateTransactionInput,
  CreateTransactionOutput,
  CreateTransactionOutputMapper,
} from '../dto/create-transaction.dto';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';

export class CreateTransactionUseCase {
  #transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.#transactionRepository = transactionRepository;
  }
  async execute(
    input: CreateTransactionInput,
  ): Promise<CreateTransactionOutput> {
    const transaction = new Transaction({
      from_id: input.account_id_from,
      to_id: input.account_id_to,
      amount: input.amount,
    });
    await this.#transactionRepository.create(transaction);
    return CreateTransactionOutputMapper.toOutput(transaction);
  }
}
