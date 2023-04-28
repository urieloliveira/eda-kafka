import { MysqlConnection } from '../database/mysql-connection';
import { MysqlUnitOfWork } from './mysql.uow';
import { UnitOfWork } from './uow.interface';

class TestRepository {
  #connection: MysqlConnection;

  constructor() {
    this.#connection = MysqlConnection.getInstance();
  }
  async create(name: string, idade?: number): Promise<void> {
    await this.#connection.query(
      'INSERT INTO test_table (name, idade) VALUES (?, ?)',
      [name, idade],
    );
  }

  async findAll(): Promise<any[]> {
    return await this.#connection.query('SELECT * FROM test_table');
  }
}

describe('MysqlUOW', () => {
  let uow: UnitOfWork;
  beforeEach(() => {
    MysqlConnection.getInstance({ database: 'test' });
    uow = new MysqlUnitOfWork();
  });

  it('should register a repository', () => {
    uow.register('test', TestRepository);
    expect(uow.getRepository('test')).toBeInstanceOf(TestRepository);
  });

  it('should unregister a repository', () => {
    uow.register('test', TestRepository);
    uow.unRegister('test');
    expect(uow.getRepository('test')).toBeUndefined();
  });

  it('should do a transaction', async () => {
    uow.register('test', TestRepository);
    await expect(
      uow.do(async () => {
        const testRepository = uow.getRepository('test');
        await testRepository.create('test', 20);
        await testRepository.create('test', 'error');
      }),
    ).rejects.toThrow(
      "Incorrect integer value: 'error' for column 'idade' at row 1",
    );
    const testRepository = uow.getRepository('test');
    const result = await testRepository.findAll();
    expect(result.length).toBe(0);
  });
});
