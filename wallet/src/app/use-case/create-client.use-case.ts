import {
  CreateClientInput,
  CreateClientOutput,
  CreateClientOutputMapper,
} from '../dto/create-client.dto';
import { Client } from '../../domain/entity/client.entity';
import { ClientRepository } from '../../domain/repository/client.repository';

export class CreateClientUseCase {
  #clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.#clientRepository = clientRepository;
  }
  async execute(input: CreateClientInput): Promise<CreateClientOutput> {
    const client = new Client({
      name: input.name,
      email: input.email,
    });
    await this.#clientRepository.create(client);
    return CreateClientOutputMapper.toOutput(client);
  }
}
