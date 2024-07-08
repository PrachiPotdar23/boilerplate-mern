import { Comment } from '../types';
import { CommentDB } from './store/comment-db';

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    const comment = new Comment();
    comment.id = commentDb._id.toString();
    comment.task = commentDb.task;
    comment.account = commentDb.account;
    comment.comment = commentDb.comment;
    comment.createdAt = commentDb.createdAt;
    comment.updatedAt = commentDb.updatedAt;
    return comment;
  }
}