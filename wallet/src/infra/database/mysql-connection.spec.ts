import { MysqlConnection } from './mysql-connection';

describe('MysqlConnection', () => {
  let connection: MysqlConnection;

  beforeEach(async () => {
    connection = MysqlConnection.getInstance({ database: 'test' });
    await connection.connect();
  });

  afterAll(() => {
    connection.close();
  });

  it('should connect', async () => {
    expect(connection).toBeDefined();
    expect(connection.state).toBe('connected');
  });

  it('should query', async () => {
    let select = await connection.query('SELECT 1 + 1 AS solution');
    expect(select[0].solution).toBe(2);
    select = await connection.query('SELECT 2 + 2 AS solution');
    expect(select[0].solution).toBe(4);
    connection.close();
    expect(async () => {
      await connection.query('SELECT 1 + 1 AS solution');
    }).rejects.toThrow(
      `Can't add new command when connection is in closed state`,
    );
  });

  it('should beginTransaction', async () => {
    try {
      await connection.beginTransaction();
      const success = await connection.query(
        'INSERT INTO test_table (name) VALUES (?)',
        ['test'],
      );
      expect(success.affectedRows).toBe(1);
      await connection.query(
        'INSERT INTO test_table (none_column) VALUES (?)',
        ['test'],
      );
      await connection.commit();
    } catch (error) {
      expect(error).toMatchObject(
        new Error("Unknown column 'none_column' in 'field list'"),
      );
      expect(error.code).toBe('ER_BAD_FIELD_ERROR');
      await connection.rollback();
    }
    const select = await connection.query('SELECT * FROM test_table');
    expect(select.length).toBe(0);
  });
});
