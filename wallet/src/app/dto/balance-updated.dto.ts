import { Transaction } from '../../domain/entity/transaction.entity';

export type BalanceUpdatedOutput = {
  account_id_from: string;
  account_id_to: string;
  balance_account_id_from: number;
  balance_account_id_to: number;
};

export class BalanceUpdatedOutputMapper {
  static toOutput(transaction: Transaction): BalanceUpdatedOutput {
    return {
      account_id_from: transaction.account_from.id,
      account_id_to: transaction.account_to.id,
      balance_account_id_from: transaction.account_from.balance,
      balance_account_id_to: transaction.account_to.balance,
    };
  }
}
