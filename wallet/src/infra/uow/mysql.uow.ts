import { MysqlConnection } from '../database/mysql-connection';
import { UnitOfWork } from './uow.interface';

export class MysqlUnitOfWork implements UnitOfWork {
  #repositories: Map<string, any>;
  #connection: MysqlConnection;

  constructor() {
    this.#repositories = new Map();
    this.#connection = MysqlConnection.getInstance();
  }

  register(name: string, repository: any): void {
    this.#repositories.set(name, repository);
  }

  getRepository(name: string): any {
    const repo = this.#repositories.get(name);
    if (!repo) return;
    return repo;
  }

  async do(callback: () => Promise<void>): Promise<void> {
    await this.#connection.beginTransaction();
    try {
      await callback();
      await this.#connection.commit();
    } catch (error) {
      await this.#connection.rollback();
      throw error;
    }
  }

  async commit(): Promise<void> {
    return this.#connection.commit();
  }

  async rollback(): Promise<void> {
    return this.#connection.rollback();
  }

  unRegister(name: string): void {
    this.#repositories.delete(name);
  }
}
