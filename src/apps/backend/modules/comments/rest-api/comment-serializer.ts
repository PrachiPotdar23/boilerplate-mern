import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): unknown => ({
  id: comment.id,
  task: comment.task,
  account:comment.account,
  comment: comment.comment,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});
