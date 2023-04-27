import { MysqlConnection } from '../database/mysql-connection';
import { Transaction } from '../../domain/entity/transaction.entity';
import { TransactionRepository } from '../../domain/repository/transaction.repository';

export class MysqlTransactionRepository implements TransactionRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }
  async findById(id: string): Promise<Transaction> {
    const transactions = await this.#connection.query(
      'SELECT * FROM transactions WHERE id = ?',
      [id],
    );
    if (transactions.length === 0) {
      throw new Error('Transaction not found');
    }
    return this.toEntity(transactions[0]);
  }

  async update(transaction: Transaction): Promise<void> {
    // TODO: implement
  }

  async create(transaction: Transaction): Promise<void> {
    // TODO: implement
  }

  async delete(id: string): Promise<void> {
    await this.#connection.query('DELETE FROM transactions WHERE id = ?', [id]);
  }

  private toEntity(row: any): Transaction {
    return new Transaction({
      id: row.id,
      from_id: row.from_id,
      to_id: row.to_id,
      amount: row.amount,
      created_at: row.created_at,
    });
  }
}
