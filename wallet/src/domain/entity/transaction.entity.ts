import { nanoid } from 'nanoid';

type TransactionProps = {
  id?: string;
  from_id: string;
  to_id: string;
  amount: number;
  created_at?: Date;
};

export class Transaction {
  #id: string;
  #from_id: string;
  #to_id: string;
  #amount: number;
  #created_at: Date;
  constructor(props: TransactionProps) {
    this.#id = props.id || nanoid();
    this.#from_id = props.from_id;
    this.#to_id = props.to_id;
    this.#amount = props.amount;
    this.#created_at = props.created_at || new Date();
  }

  get id() {
    return this.#id;
  }

  get from_id() {
    return this.#from_id;
  }

  get to_id() {
    return this.#to_id;
  }

  get amount() {
    return this.#amount;
  }

  get created_at() {
    return this.#created_at;
  }
}
