import { Transaction } from '../entity/transaction.entity';

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
}
