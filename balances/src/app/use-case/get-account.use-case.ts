import {
  GetAccountInput,
  GetAccountOutput,
  GetAccountOutputMapper,
} from '../dto/get-account.dto';
import { AccountRepository } from '../../domain/repository/account.repository';

export class GetAccountUseCase {
  #accountRepository: AccountRepository;
  constructor(accountRepository) {
    this.#accountRepository = accountRepository;
  }
  async execute(input: GetAccountInput): Promise<GetAccountOutput> {
    const account = await this.#accountRepository.findById(input.id);
    return GetAccountOutputMapper.toOutput(account);
  }
}
