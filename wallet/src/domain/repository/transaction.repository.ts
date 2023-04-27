import { Transaction } from '../entity/transaction.entity';

export interface TransactionRepository {
  findById(id: string): Promise<Transaction>;
  update(transaction: Transaction): Promise<void>;
  create(transaction: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
}
