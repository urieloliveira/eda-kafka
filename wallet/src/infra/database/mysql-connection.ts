import mysql from 'mysql2';

export class MysqlConnection {
  static instance: MysqlConnection;
  connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'mysql',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'balances',
    });
    this.connection.connect((err) => {
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
      this.connection.query(statement, params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  beginTransaction(): Promise<void> {
    return new Promise((_resolve, reject) => {
      this.connection.beginTransaction((err) => {
        if (err) {
          console.error('error beginTransaction: ' + err.stack);
          reject(err);
        }
      });
    });
  }

  commit(): Promise<void> {
    return new Promise((_resolve, reject) => {
      this.connection.commit((err) => {
        if (err) {
          console.error('error commit: ' + err.stack);
          reject(err);
        }
      });
    });
  }

  rollback(): Promise<void> {
    return new Promise((_resolve, reject) => {
      this.connection.rollback((err) => {
        if (err) {
          console.error('error rollback: ' + err.stack);
          reject(err);
        }
      });
    });
  }

  close(): void {
    return this.connection.destroy();
  }
}
