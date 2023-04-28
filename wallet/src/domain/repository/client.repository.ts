import { Client } from '../entity/client.entity';

export interface ClientRepository {
  create(client: Client): Promise<void>;
}
