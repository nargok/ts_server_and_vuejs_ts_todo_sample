import { Task } from "../../domain/models/Task";

const _serializeSingleTask = (task: Task) => {
  return {
    uuid: task.uuid,
    title: task.title,
    createdAt: task.cretedAt,
    updatedAt: task.updatedAt,
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
