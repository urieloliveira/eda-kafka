import { nanoid } from 'nanoid';

type ClientProps = {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export class Client {
  #id: string;
  #name: string;
  #email: string;
  #created_at: Date;
  #updated_at: Date;
  constructor(props: ClientProps) {
    this.#id = props.id || nanoid();
    this.#name = props.name;
    this.#email = props.email;
    this.#created_at = props.created_at || new Date();
    this.#updated_at = props.updated_at || new Date();
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get created_at() {
    return this.#created_at;
  }

  get updated_at() {
    return this.#updated_at;
  }
}
