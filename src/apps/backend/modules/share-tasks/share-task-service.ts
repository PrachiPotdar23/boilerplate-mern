import ShareTaskReader from './internal/share-task-reader';
import ShareTaskWriter from './internal/share-task-writer';
import { CreateSharedTaskParams, GetSharedTasksParams,SharedTask} from './types';

export default class ShareTaskService {
  public static async shareTask(params: CreateSharedTaskParams): Promise<SharedTask> {
    return ShareTaskWriter.shareTask(params);
  }

  public static async getSharedTask(params: GetSharedTasksParams): Promise<SharedTask[]> {
    return ShareTaskReader.getSharedTasks(params);
  }
}
