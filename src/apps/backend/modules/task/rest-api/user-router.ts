import { Router, Request, Response, NextFunction } from 'express';
import AccountReader from '../../account/internal/account-reader';

const router = Router();

router.get('/users', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await AccountReader.getAllActiveUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
