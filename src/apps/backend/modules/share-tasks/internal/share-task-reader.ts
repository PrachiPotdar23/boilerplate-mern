import SharedTaskRepository from './store/share-task-repository';
import { GetSharedTasksParams } from '../types';
import { SharedTask } from '../types';
import SharedTaskUtil from './share-task-util';

export default class ShareTaskReader {
  public static async getSharedTasks(params: GetSharedTasksParams): Promise<SharedTask[]> {
    const sharedTasksDb = await SharedTaskRepository.find({
      account: params.accountId,
    }).populate({
      path: 'task',
      select: 'title description' // Specify fields to fetch from Task
    }).populate({
      path: 'account',
      select: 'username' // Specify fields to fetch from Account
    });
    return sharedTasksDb.map((sharedTaskDb) => SharedTaskUtil.convertSharedTaskDBToSharedTask(sharedTaskDb));
  }
  
}