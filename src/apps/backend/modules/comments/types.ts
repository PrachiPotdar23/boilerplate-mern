
export class Comment {
  id: string;
  task: string;
  user: string;
  comment: string;
  active: boolean;
}



export type GetCommentParams = {
  taskId: string;
  commentId: string;
};

export type CreateCommentParams = {
  taskId: string;
  userId: string;
  comment: string;
};

export type UpdateCommentParams = {
  userId: string;
  comment: string;
  commentId: string;
};

export type DeleteCommentParams = {
  taskId: string;
  commentId: string;
};

