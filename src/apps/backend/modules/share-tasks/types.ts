//backend\modules\share-tasks\types.ts
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

// Define the SharedTask class
export class SharedTask {
  id: string;
  task: string;
  account: string;
  title: string;
  description: string;
  username: string;
}
// Define the parameters for getting shared tasks
export type GetSharedTasksParams = {
  accountId: string;
};

// Define the parameters for creating a shared task
export type CreateSharedTaskParams = {
  accountId: string;
  taskId: string;
};

// Enum for shared task error codes
export enum ShareTaskErrorCode {
  NOT_FOUND = 'SHARE_TASK_ERR_01',
}

// Custom error class for shared task not found
export class ShareTaskNotFoundError extends ApplicationError {
  code: ShareTaskErrorCode;

  constructor(taskId: string) {
    super(`Shared Task with taskId ${taskId} not found.`);
    this.code = ShareTaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
