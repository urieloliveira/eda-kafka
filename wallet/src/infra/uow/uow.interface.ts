export interface UnitOfWork {
  register(name: string, repository: any): void;
  getRepository(name: string): any;
  do(callback: () => Promise<void>): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  unRegister(name: string): void;
}
