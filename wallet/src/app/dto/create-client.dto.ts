import { Client } from '../../domain/entity/client.entity';

export type CreateClientInput = {
  name: string;
  email: string;
};

export type CreateClientOutput = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export class CreateClientOutputMapper {
  static toOutput(client: Client): CreateClientOutput {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      created_at: client.created_at,
      updated_at: client.updated_at,
    };
  }
}
