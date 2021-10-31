import { Task } from "../../domain/models/Task";
import { ITaskRepository } from "../repositories/ITaskRepository";

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(title: string) {
    let task = new Task(title);
    return this.taskRepository.persist(task);
  }
}
