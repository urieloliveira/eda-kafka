import mysql from 'mysql2/promise';

export class MysqlConnection {
  static instance: MysqlConnection;
  connection: mysql.Connection;
  state: string;
  config: mysql.ConnectionOptions;

  constructor(config?: Partial<mysql.ConnectionOptions>) {
    this.state = 'disconnected';
    this.config = {
      host: config?.host || 'mysql',
      port: config?.port || 3306,
      user: config?.user || 'root',
      password: config?.password || 'root',
      database: config?.database || 'wallet',
    };
  }

  async connect(): Promise<void> {
    if (this.state === 'connected') {
      return;
    }
    this.connection = await mysql.createConnection(this.config);
    this.state = 'connected';
  }

  static getInstance(
    config?: Partial<mysql.ConnectionOptions>,
  ): MysqlConnection {
    if (!MysqlConnection.instance) {
      MysqlConnection.instance = new MysqlConnection(config);
    }
    return MysqlConnection.instance;
  }

  async query(statement: string, params?: any): Promise<any> {
    await this.connect();
    try {
      const response = await this.connection.query(statement, params);
      return response[0];
    } catch (error) {
      throw error;
    }
  }
  async beginTransaction(): Promise<void> {
    await this.connect();
    await this.connection.beginTransaction();
  }

  async commit(): Promise<void> {
    await this.connection.commit();
  }

  async rollback(): Promise<void> {
    try {
      await this.connection.rollback();
    } catch (error) {
      throw error;
    }
  }

  close(): void {
    return this.connection.destroy();
  }
}
