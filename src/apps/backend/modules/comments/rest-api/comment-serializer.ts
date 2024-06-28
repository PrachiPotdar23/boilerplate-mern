import { CommentDB } from '../internal/store/comment-db';

export class CommentSerializer {
  public static serialize(comment: CommentDB) {
    return {
      id: comment._id,
      task: comment.task,
      user: {
        id: comment.user._id,
        //username: comment.user.username, // Assuming user has a username field
      },
      comment: comment.comment,
      active: comment.active,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }

  public static serializeMany(comments: CommentDB[]) {
    return comments.map(this.serialize);
  }
}
