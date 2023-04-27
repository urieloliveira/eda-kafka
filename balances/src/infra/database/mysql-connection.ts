import mysql from 'mysql2';

export class MysqlConnection {
  static instance: MysqlConnection;
  mysql: mysql.Connection;

  constructor() {
    this.mysql = mysql.createConnection({
      host: 'mysql',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'balances',
    });
    this.mysql.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
      }
    });
  }

  static getInstance(): MysqlConnection {
    if (!MysqlConnection.instance) {
      MysqlConnection.instance = new MysqlConnection();
    }
    return MysqlConnection.instance;
  }

  query(statement: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mysql.query(statement, params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  close(): void {
    return this.mysql.destroy();
  }
}
