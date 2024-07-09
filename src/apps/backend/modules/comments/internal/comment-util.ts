import { Comment } from '../types';
import { CommentDB } from './store/comment-db';
import { Types } from 'mongoose';
import { Task } from '../../task'; 
import { Account } from '../../account'; 

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

  private static convertTask(task: Types.ObjectId | Task): Task | string {
    if (task instanceof Types.ObjectId) {
      return task.toString(); 
    } else if (typeof task === 'object' && !(task instanceof Task)) {
      const convertedTask = new Task();
      convertedTask.id = task.id || task._id.toString();
      convertedTask.title = task.title;
      convertedTask.description = task.description;
      
      return convertedTask;
    }
    return task as Task; 
  }

  private static convertAccount(account: Types.ObjectId | Account): Account | string {
    if (account instanceof Types.ObjectId) {
      return account.toString();
    } else if (typeof account === 'object' && !(account instanceof Account)) {
      
      const convertedAccount = new Account();
      convertedAccount.id = account.id || account._id.toString();
      convertedAccount.firstName = account.firstName;
      convertedAccount.lastName = account.lastName;
      convertedAccount.username = account.username;
     
      return convertedAccount;
    }
    return account as Account; 
  }
}
