import { MysqlConnection } from './mysql-connection';

describe('MysqlConnection', () => {
  it('should create a connection with mysql', async () => {
    const mysqlConnection = MysqlConnection.getInstance();
    expect(mysqlConnection).toBeInstanceOf(MysqlConnection);
    const res = await new Promise((resolve, reject) => {
      mysqlConnection.connection.connect((err) => {
        if (err) {
          reject(err);
        }
        resolve('connected');
      });
    });
    expect(res).toBe('connected');
    let select = await mysqlConnection.query('SELECT 1 + 1 AS solution');
    expect(select[0].solution).toBe(2);
    select = await mysqlConnection.query('SELECT 2 + 2 AS solution');
    expect(select[0].solution).toBe(4);
    mysqlConnection.close();
    expect(async () => {
      await mysqlConnection.query('SELECT 1 + 1 AS solution');
    }).rejects.toThrow(
      `Can't add new command when connection is in closed state`,
    );
  });
});
