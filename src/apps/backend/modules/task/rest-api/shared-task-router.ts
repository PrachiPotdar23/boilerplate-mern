import { Router } from 'express';
import { SharedTaskController } from './shared-task-controller';

const router = Router();
const sharedTaskController = new SharedTaskController();

router.post('/:taskId/share', sharedTaskController.shareTask);
router.get('/:taskId/shared', sharedTaskController.getSharedTasks);

export { router };