import { Task } from "../../domain/models/Task";

export abstract class ITaskRepository {
  abstract persist(task: Task): Promise<Task>;
}
