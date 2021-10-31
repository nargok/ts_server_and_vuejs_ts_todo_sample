import { TaskSerializer } from "../serializers/TaskSerializer";
import { TaskRepository } from "../database/TaskRepository";
import { IDBConnection } from "../database/IDBConnection";
import { CreateTask } from "../..//application/useCases/CreateTask";

export class TasksController {
  private taskSerializer: TaskSerializer;
  private taskRepository: TaskRepository;

  constructor(dbConnection: IDBConnection) {
    this.taskSerializer = new TaskSerializer();
    this.taskRepository = new TaskRepository(dbConnection);
  }

  async createTask(req: any, res: any) {
    const { title } = req.body;
    const useCase = new CreateTask(this.taskRepository);
    const result = await useCase.execute(title);
    return this.taskSerializer.serialize(result);
  }
}
