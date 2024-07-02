import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): object => {
  return {
    id: comment.id,
    taskId: comment.taskId,
    accountId: comment.accountId,
    comment: comment.comment,
    active: comment.active,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};
