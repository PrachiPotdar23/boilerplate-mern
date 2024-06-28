import { Comment } from '../types';
import { CommentDB } from './store/comment-db';

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    const comment = new Comment();
    comment.id = commentDb._id.toString();
    comment.task = commentDb.task.toString();
    comment.user = commentDb.user.toString();
    comment.comment = commentDb.comment;
    comment.active = commentDb.active;
    return comment;
  }
}
