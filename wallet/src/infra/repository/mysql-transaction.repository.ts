import { MysqlConnection } from '../database/mysql-connection';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';

export class MysqlTransactionRepository implements TransactionRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }

  async create(transaction: Transaction): Promise<void> {
    await this.#connection.query(
      'INSERT INTO transactions (id, account_id_from, account_id_to, amount, created_at) VALUES (?, ?, ?, ?, ?)',
      [
        transaction.id,
        transaction.account_from.id,
        transaction.account_to.id,
        transaction.amount,
        transaction.created_at,
      ],
    );
  }
}
