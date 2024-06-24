// shared-task-controller.ts
import TaskService from '../task-service';
import { Request, Response } from 'express';

class SharedTaskController {
  constructor() {
  }

  async shareTask(req: Request, res: Response) {
    try {
      const taskId = req.params.taskId;
      const userId = req.body.userId;

      // Input validation
      if (!taskId ||!userId) {
        res.status(400).json({ message: 'Invalid input parameters' });
        return;
      }

      const accountId = req.params.accountId; // or get it from somewhere else
      const task = await TaskService.shareTask({ taskId, userIds: [userId], accountId: accountId });
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sharing task' });
    }
  }

  async getSharedTasks(req: Request, res: Response) {
    try {
      const accountId = req.params.accountId;
      const tasks = await TaskService.getSharedTasks({ accountId });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting shared tasks' });
    }
  }
}

export { SharedTaskController };