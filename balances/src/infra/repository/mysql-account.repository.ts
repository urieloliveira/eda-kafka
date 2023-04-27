import { MysqlConnection } from '../database/mysql-connection';
import { Account } from '../../domain/entity/account.entity';
import { AccountRepository } from '../../domain/repository/account.repository';

export class MysqlAccountRepository implements AccountRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }
  async findById(id: string): Promise<Account> {
    const accounts = await this.#connection.query(
      'SELECT * FROM accounts WHERE id = ?',
      [id],
    );
    if (accounts.length === 0) {
      throw new Error('Account not found');
    }
    return this.toEntity(accounts[0]);
  }

  async update(account: Account): Promise<void> {
    await this.#connection.query(
      'UPDATE accounts SET balance = ? WHERE id = ?',
      [account.balance, account.id],
    );
  }

  async create(account: Account): Promise<void> {
    await this.#connection.query(
      'INSERT INTO accounts (id, balance) VALUES (?, ?)',
      [account.id, account.balance],
    );
  }

  async delete(id: string): Promise<void> {
    await this.#connection.query('DELETE FROM accounts WHERE id = ?', [id]);
  }

  private toEntity(row: any): Account {
    return new Account({
      id: row.id,
      balance: row.balance,
    });
  }
}
