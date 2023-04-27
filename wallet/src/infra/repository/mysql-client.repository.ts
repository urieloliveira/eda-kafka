import { MysqlConnection } from '../database/mysql-connection';
import { Client } from '../../domain/entity/client.entity';
import { ClientRepository } from '../../domain/repository/client.repository';

export class MysqlClientRepository implements ClientRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }
  async findById(id: string): Promise<Client> {
    const clients = await this.#connection.query(
      'SELECT * FROM clients WHERE id = ?',
      [id],
    );
    if (clients.length === 0) {
      throw new Error('Client not found');
    }
    return this.toEntity(clients[0]);
  }

  async update(client: Client): Promise<void> {
    // TODO: implement
  }

  async create(client: Client): Promise<void> {
    // TODO: implement
  }

  async delete(id: string): Promise<void> {
    await this.#connection.query('DELETE FROM clients WHERE id = ?', [id]);
  }

  private toEntity(row: any): Client {
    return new Client({
      id: row.id,
      name: row.name,
      email: row.email,
      created_at: row.created_at,
      updated_at: row.updated_at,
    });
  }
}
