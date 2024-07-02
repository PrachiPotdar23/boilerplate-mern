import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import SharedTaskService from '../share-task-service';
import {
  CreateSharedTaskParams,
  GetSharedTasksParams,
  SharedTask,
} from '../types';
import { serializeSharedTaskAsJSON } from './share-task-serializer';

export class SharedTaskController {
  shareTask = applicationController(
    async (req: Request<CreateSharedTaskParams>, res: Response) => {
      const taskId = req.body.taskId;
      const accountId = req.body.accountId;
      

      const sharedTask: SharedTask = await SharedTaskService.shareTask({
        taskId,
        accountId,
      });
      const sharedTaskJSON = serializeSharedTaskAsJSON(sharedTask);
      res.status(HttpStatusCodes.CREATED).send(sharedTaskJSON);
    },
  );

  getSharedTasks = applicationController(
    async (req: Request<GetSharedTasksParams>, res: Response) => {
      const sharedTasks = await SharedTaskService.getSharedTask({
        accountId: req.accountId,
      });
      const sharedTasksJSON = sharedTasks.map((sharedTask) =>
        serializeSharedTaskAsJSON(sharedTask),
      );
      res.status(HttpStatusCodes.OK).send(sharedTasksJSON);
    },
  );
}