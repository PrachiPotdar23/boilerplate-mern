import { Comment } from '../types';
import { CommentDB } from './store/comment-db';
import { Types } from 'mongoose';
import { Task } from '../tasks/task'; // Assuming Task is imported from its module
import { Account } from '../account/account'; // Assuming Account is imported from its module

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    const comment = new Comment();
    comment.id = commentDb._id.toString();
    comment.task = this.convertTask(commentDb.task);
    comment.account = this.convertAccount(commentDb.account);
    comment.comment = commentDb.comment;
    comment.createdAt = commentDb.createdAt;
    comment.updatedAt = commentDb.updatedAt;
    return comment;
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
