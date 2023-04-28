import { Transaction } from '../../domain/entity/transaction.entity';

export type CreateTransactionInput = {
  account_id_from: string;
  account_id_to: string;
  amount: number;
};

export type CreateTransactionOutput = {
  id: string;
  account_id_from: string;
  account_id_to: string;
  amount: number;
};

export class CreateTransactionOutputMapper {
  static toOutput(transaction: Transaction): CreateTransactionOutput {
    return {
      id: transaction.id,
      account_id_from: transaction.account_from.id,
      account_id_to: transaction.account_to.id,
      amount: transaction.amount,
    };
  }
}
