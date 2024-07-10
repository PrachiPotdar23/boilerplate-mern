import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { SharedTaskController } from './share-task-controller';

export default class ShareTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const sharedTaskController = new SharedTaskController();
  
  
    router.use(accessAuthMiddleware); // Ensure middleware is correctly applied
    router.post('/', sharedTaskController.shareTask); // Ensure this matches the frontend call
    router.get('/:accountId', sharedTaskController.getSharedTasks); // Ensure this matches the frontend call
  }
}
