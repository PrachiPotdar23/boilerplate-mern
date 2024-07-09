import { SharedTask } from '../types';
import { SharedTaskDB } from './store/share-task-db';
import { Types } from 'mongoose';
import { Task } from '../../task';
import { Account } from '../../account'; 

export default class SharedTaskUtil {
  public static convertSharedTaskDBToSharedTask(
    sharedTaskDb: SharedTaskDB,
  ): SharedTask {
    const sharedTask = new SharedTask();
    sharedTask.id = sharedTaskDb._id.toString();
    sharedTask.task = this.convertTask(sharedTaskDb.task);
    sharedTask.account = this.convertAccount(sharedTaskDb.account);
    return sharedTask;
  }

  private static convertTask(task: Types.ObjectId | Task): string | Task {
    if (task instanceof Types.ObjectId) {
      return task.toString();
    } else {
      const convertedTask = new Task();
      convertedTask.id = task.id || task._id.toString();
      convertedTask.title = task.title;
      convertedTask.description = task.description;

      return convertedTask;
    }
  }

  private static convertAccount(account: Types.ObjectId | Account): string | Account {
    if (account instanceof Types.ObjectId) {
      return account.toString();
    } else {
      const convertedAccount = new Account();
      convertedAccount.id = account.id || account._id.toString();
      convertedAccount.firstName = account.firstName;
      convertedAccount.lastName = account.lastName;
      convertedAccount.username = account.username;

      return convertedAccount;
    }
  }
}
