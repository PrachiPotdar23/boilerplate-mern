//backend\modules\share-tasks\internal\share-task-writer.ts

import { CreateSharedTaskParams,SharedTask} from '../types';
import SharedTaskUtil from './share-task-util';
import SharedTaskRepository from './store/share-task-repository';

export default class ShareTaskWriter {
  public static async shareTask(params: CreateSharedTaskParams): Promise<SharedTask> {
    const sharedTask = await SharedTaskRepository.create({
      task: params.taskId,
      account: params.accountId,
    });
    return SharedTaskUtil.convertSharedTaskDBToSharedTask(sharedTask);
  }
}
