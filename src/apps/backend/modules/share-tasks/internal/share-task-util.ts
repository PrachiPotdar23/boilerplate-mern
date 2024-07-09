import { SharedTask } from '../types';
import { SharedTaskDB } from './store/share-task-db';
import { Types } from 'mongoose';
import { Task } from '../task/task'; 
import { Account } from '../account/account'; 
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

  private static convertTask(task: Types.ObjectId | Task | { [key: string]: any }): string | Task {
    if (task instanceof Types.ObjectId) {
      return task.toString();
    } else if (typeof task === 'object' && !(task instanceof Task)) {
      const convertedTask = new Task();
      convertedTask.id = task.id || task._id;
      convertedTask.title = task.title;
      convertedTask.description = task.description;

      return convertedTask;
    }
    return task as Task;
  }

  private static convertAccount(account: Types.ObjectId | Account | { [key: string]: any }): string | Account {
    if (account instanceof Types.ObjectId) {
      return account.toString();
    } else if (typeof account === 'object' && !(account instanceof Account)) {
      const convertedAccount = new Account();
      convertedAccount.id = account.id || account._id;
      convertedAccount.firstName = account.firstName;
      convertedAccount.lastName = account.lastName;
      convertedAccount.username = account.username;

      return convertedAccount;
    }
    return account as Account;
  }
}
