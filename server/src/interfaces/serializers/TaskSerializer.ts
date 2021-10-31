import { Task } from "../../domain/models/Task";

const _serializeSingleTask = (task: Task) => {
  return {
    // id: task.id,
    title: task.title,
  };
};

export class TaskSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error("except data to be not undefined nor null");
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleTask);
    }
    return _serializeSingleTask(data);
  }
}