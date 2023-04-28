import { MysqlConnection } from '../database/mysql-connection';
import { Client } from '../../domain/entity/client.entity';
import { ClientRepository } from '../../domain/repository/client.repository';

export class MysqlClientRepository implements ClientRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }

  async create(client: Client): Promise<void> {
    await this.#connection.query(
      'INSERT INTO clients (id, name, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        client.id,
        client.name,
        client.email,
        client.created_at,
        client.updated_at,
      ],
    );
  }
}
