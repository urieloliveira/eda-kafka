import { Account } from '../../domain/entity/account.entity';

export type CreateAccountInput = {
  client_id: string;
};

export type CreateAccountOutput = {
  id: string;
};

export class CreateAccountOutputMapper {
  static toOutput(account: Account): CreateAccountOutput {
    return { id: account.id };
  }
}
