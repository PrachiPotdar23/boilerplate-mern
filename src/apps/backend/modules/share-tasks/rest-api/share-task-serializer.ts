//backend\modules\share-tasks\rest-api\share-task-serializer.ts
import { SharedTask } from '../types';

export const serializeSharedTaskAsJSON = (sharedTask: SharedTask): unknown => ({
  id: sharedTask.id,
  task: sharedTask.task,
  account: sharedTask.account,
  title: sharedTask.title,
  description: sharedTask.description,
  username: sharedTask.username,
});