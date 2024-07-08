import SharedTaskRepository from './store/share-task-repository';
import { GetSharedTasksParams } from '../types';
import { SharedTaskDB } from './store/share-task-db';
export default class ShareTaskReader {
  public static async getSharedTasks(params: GetSharedTasksParams): Promise<SharedTaskDB[]> {
    const sharedTasksDb = await SharedTaskRepository.find({
      account: params.accountId,
    }).populate({
      path: 'task',
      populate: {
        path: 'account',
        model: 'accounts',
      },
    });
    // let parsedTasks=sharedTasksDb.map(task => ({
    //   ...task.toObject(), // Convert Mongoose Document to plain JS object
    //   task: JSON.parse(task.task) // Parse the task string into a JSON object
    // }));
    return sharedTasksDb;
  }
}
