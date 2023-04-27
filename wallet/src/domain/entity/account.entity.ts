import { nanoid } from 'nanoid';

type AccountProps = {
  id?: string;
  client_id: string;
  balance?: number;
  created_at?: Date;
  updated_at?: Date;
};

export class Account {
  #id: string;
  #client_id: string;
  #balance: number;
  #created_at: Date;
  #updated_at: Date;
  constructor(props: AccountProps) {
    this.#id = props.id || nanoid();
    this.#client_id = props.client_id;
    this.#balance = props.balance || 0;
    this.#created_at = props.created_at || new Date();
    this.#updated_at = props.updated_at || new Date();
  }

  get id() {
    return this.#id;
  }

  get client_id() {
    return this.#client_id;
  }

  get balance() {
    return this.#balance;
  }

  set balance(value: number) {
    this.#balance = value;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }
}
