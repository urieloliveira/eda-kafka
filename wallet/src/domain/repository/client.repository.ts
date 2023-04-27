import { Client } from '../entity/client.entity';

export interface ClientRepository {
  findById(id: string): Promise<Client>;
  update(client: Client): Promise<void>;
  create(client: Client): Promise<void>;
  delete(id: string): Promise<void>;
}
