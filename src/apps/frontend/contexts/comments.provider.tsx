import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from 'react';
import CommentsService from '../services/comments.service';
import { ApiResponse, AsyncError } from '../types';
import { Comment } from '../types/comments';
import useAsync from './async.hook';

type CommentsContextType = {
  addComment: (taskId: string, comment: string) => Promise<ApiResponse<Comment>>;
  addCommentError: AsyncError | null;
  getComments: (taskId: string) => Promise<ApiResponse<Comment[]>>;
  getCommentsError: AsyncError | null;
  updateComment: (commentId: string, comment: string) => Promise<ApiResponse<Comment>>;
  updateCommentError: AsyncError | null;
  deleteComment: (commentId: string) => Promise<ApiResponse<void>>;
  deleteCommentError: AsyncError | null;
  isAddCommentLoading: boolean;
  isGetCommentsLoading: boolean;
  isUpdateCommentLoading: boolean;
  isDeleteCommentLoading: boolean;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const CommentsContext = createContext<CommentsContextType | null>(null);

const commentsService = new CommentsService();

export const useCommentsContext = (): CommentsContextType => useContext(CommentsContext) as CommentsContextType;

const addCommentFn = async (taskId: string, comment: string): Promise<ApiResponse<Comment>> =>
  commentsService.addComment(taskId, comment);

const updateCommentFn = async (commentId: string, comment: string): Promise<ApiResponse<Comment>> =>
  commentsService.updateComment(commentId, comment);

const deleteCommentFn = async (commentId: string): Promise<ApiResponse<void>> =>
  commentsService.deleteComment(commentId);

export const CommentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const getCommentsFn = async (taskId: string): Promise<ApiResponse<Comment[]>> => {
    const response = await commentsService.getComments(taskId);
    if (response.data) {
      setComments(response.data);
    }
    return response;
  };

  const {
    asyncCallback: addComment,
    error: addCommentError,
    isLoading: isAddCommentLoading,
  } = useAsync(addCommentFn);

  const {
    asyncCallback: getComments,
    error: getCommentsError,
    isLoading: isGetCommentsLoading,
    result: commentsResult,
  } = useAsync(getCommentsFn);

  const {
    asyncCallback: updateComment,
    error: updateCommentError,
    isLoading: isUpdateCommentLoading,
  } = useAsync(updateCommentFn);

  const {
    asyncCallback: deleteComment,
    error: deleteCommentError,
    isLoading: isDeleteCommentLoading,
  } = useAsync(deleteCommentFn);

  useEffect(() => {
    if (commentsResult?.data) {
      setComments(commentsResult.data);
    }
  }, [commentsResult]);

  return (
    <CommentsContext.Provider
      value={{
        addComment,
        addCommentError,
        getComments,
        getCommentsError,
        updateComment,
        updateCommentError,
        deleteComment,
        deleteCommentError,
        isAddCommentLoading,
        isGetCommentsLoading,
        isUpdateCommentLoading,
        isDeleteCommentLoading,
        comments,
        setComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
