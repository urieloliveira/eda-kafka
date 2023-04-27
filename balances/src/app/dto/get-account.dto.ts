import { Account } from '../../domain/entity/account.entity';

export type GetAccountInput = {
  id: string;
};

export type GetAccountOutput = {
  id: string;
  balance: number;
};

export class GetAccountOutputMapper {
  static toOutput(account: Account): GetAccountOutput {
    return {
      id: account.id,
      balance: account.balance,
    };
  }
}
