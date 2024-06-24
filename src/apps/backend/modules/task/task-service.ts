// task-service.ts
import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import { Types } from 'mongoose';
import TaskRepository from './internal/store/task-repository';
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  Task,
  UpdateTaskParams,
  ShareTaskParams, // Add this import
} from './types';

export default class TaskService {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    return TaskWriter.createTask(params);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    return TaskWriter.deleteTask(params);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    return TaskWriter.updateTask(params);
  }

  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    return TaskReader.getTaskForAccount(params);
  }

  public static async getTasksForAccount(params: GetAllTaskParams): Promise<Task[]> {
    return TaskReader.getTasksForAccount(params);
  }

  public static async shareTask(params: ShareTaskParams): Promise<Task> {
    return TaskWriter.shareTask(params);
  }

  public static async taskExists(taskId: Types.ObjectId): Promise<boolean> {
    const task = await TaskRepository.findOne({ _id: taskId, active: true });
    return !!task;
  }

  public static async getSharedTasks(params: { accountId: string }): Promise<Task[]> {
    
    return TaskReader.getSharedTasks({ accountId: new Types.ObjectId(params.accountId) });
}
}
