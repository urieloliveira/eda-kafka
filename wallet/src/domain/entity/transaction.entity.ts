import { nanoid } from 'nanoid';
import { Account } from './account.entity';

type TransactionProps = {
  id?: string;
  account_from: Account;
  account_to: Account;
  amount: number;
  created_at?: Date;
};

export class Transaction {
  #id: string;
  #account_from: Account;
  #account_to: Account;
  #amount: number;
  #created_at: Date;
  constructor(props: TransactionProps) {
    this.#id = props.id || nanoid();
    this.#account_from = props.account_from;
    this.#account_to = props.account_to;
    this.#amount = props.amount;
    this.#created_at = props.created_at || new Date();

    this.updateBalance();
  }

  updateBalance() {
    this.#account_from.balance -= this.#amount;
    this.#account_to.balance += this.#amount;
  }

  get id() {
    return this.#id;
  }

  get account_from() {
    return this.#account_from;
  }

  get account_to() {
    return this.#account_to;
  }

  get amount() {
    return this.#amount;
  }

  get created_at() {
    return this.#created_at;
  }
}
