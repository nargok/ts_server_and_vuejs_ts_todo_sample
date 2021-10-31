import { Pool } from "pg";
import { IDBConnection } from "../interfaces/database/IDBConnection";

export class PostgresConnection extends IDBConnection {
  private pool: any = new Pool();

  constructor() {
    super();
    this.pool = new Pool({
      database: "development",
      user: "root",
      host: "127.0.0.1",
      port: 5432,
    });
  }

  async execute(query: string, params: string) {
    // const client = await this.pool.connect();
    if (params !== null) {
      return this.pool.query(query, params);
    } else {
      return this.pool.query(query);
    }
  }

  async relseae() {
    const client = await this.pool.connect();
    client.relseae();
  }
}

// const pool = new Pool({
//   database: "development",
//   user: "root",
//   host: "127.0.0.1",
//   port: 5432,
// });

// export class DBAccessor {
//   public get = async () => {
//     const client = await pool.connect();
//     try {
//       const query = {
//         text: 'select * from public."TodoTasks"',
//       };
//       const result = await client.query(query);
//       return result.rows;
//     } catch (e) {
//       console.error(e);
//       throw e;
//     } finally {
//       client.release();
//     }
//   };
