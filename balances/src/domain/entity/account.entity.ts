type AccountProps = {
  id: string;
  balance: number;
};

export class Account {
  #id: string;
  #balance: number;
  constructor(props: AccountProps) {
    this.#id = props.id;
    this.#balance = props.balance;
  }

  get id() {
    return this.#id;
  }

  get balance() {
    return this.#balance;
  }

  set balance(value: number) {
    this.#balance = value;
  }
}
