import { UpdateAccountInput } from '../dto/update-account.dto';
import { Account } from '../../domain/entity/account.entity';
import { AccountRepository } from '../../domain/repository/account.repository';

export class UpdateAccountUseCase {
  #accountRepository: AccountRepository;
  constructor(accountRepository) {
    this.#accountRepository = accountRepository;
  }
  async execute(input: UpdateAccountInput[]): Promise<void> {
    await Promise.all(
      input.map(async (acc) => {
        const account = new Account({ id: acc.id, balance: acc.balance });
        await this.#accountRepository.update(account);
      }),
    );
  }
}
