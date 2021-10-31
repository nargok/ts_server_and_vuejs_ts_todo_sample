import { ITaskRepository } from "../../application/repositories/ITaskRepository";
import { IDBConnection } from "./IDBConnection";
// import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../domain/models/Task";

// const pool = new Pool({
//   database: "development",
//   user: "root",
//   host: "127.0.0.1",
//   port: 5432,
// });

export class TaskRepository extends ITaskRepository {
  private connection: any;

  constructor(connection: IDBConnection) {
    super();
    this.connection = connection;
  }

  // todo 一時的にコメントアウト
  // private convertModel(r: any) {
  //   let task = new Task();

  //   task.id = r.id;
  //   task.title = r.title;

  //   return task;
  // }

  async persist(task: Task): Promise<Task> {
    const { title } = task;
    try {
      const query = {
        text: 'insert into public."TodoTasks" (uuid, title, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
        values: [uuidv4(), title],
      };
      const result = await this.connection.execute(query);
      // return result.rows;
      // task.id = result.id
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      // this.connection.release();
    }
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
