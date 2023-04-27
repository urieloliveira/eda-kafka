import { Account } from '../entity/account.entity';

export interface AccountRepository {
  findById(id: string): Promise<Account>;
  update(account: Account): Promise<void>;
  create(account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
