import {
  CreateAccountInput,
  CreateAccountOutput,
  CreateAccountOutputMapper,
} from '../dto/create-account.dto';
import { Account } from '../../domain/entity/account.entity';
import { AccountRepository } from '../../domain/repository/account.repository';

export class CreateAccountUseCase {
  #accountRepository: AccountRepository;
  constructor(accountRepository: AccountRepository) {
    this.#accountRepository = accountRepository;
  }
  async execute(input: CreateAccountInput): Promise<CreateAccountOutput> {
    const account = new Account({ client_id: input.client_id });
    await this.#accountRepository.create(account);
    return CreateAccountOutputMapper.toOutput(account);
  }
}
