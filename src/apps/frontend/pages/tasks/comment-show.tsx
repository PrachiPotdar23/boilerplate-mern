import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCommentContext } from '../../contexts/comments.provider';
import { Comment } from '../../types/comments';
import { AsyncError } from '../../types';

interface CommentListProps {
  taskId: string;
}

const CommentList: React.FC<CommentListProps> = ({ taskId }) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string>('');
  const {
    getComments,
    commentsMap,
    isGetCommentsLoading,
    deleteComment,
    updateComment,
  } = useCommentContext();

  useEffect(() => {
    if (taskId && !commentsMap[taskId]) {
      getComments(taskId).catch((error: AsyncError) =>
        toast.error(error.message)
      );
    }
  }, [taskId, getComments, commentsMap]);

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, taskId)
      .then(() => {
        toast.success('Comment deleted successfully');
      })
      .catch((error: AsyncError) => toast.error(error.message));
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingComment(comment.comment);
  };

  const handleUpdateComment = () => {
    if (editingCommentId) {
      updateComment(editingCommentId, taskId, editingComment)
        .then(() => {
          setEditingCommentId(null);
          setEditingComment('');
          toast.success('Comment updated successfully');
        })
        .catch((error: AsyncError) => toast.error(error.message));
    }
  };

  const comments = commentsMap[taskId] || [];

  if (isGetCommentsLoading) {
    return <div>Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div>No comments yet.</div>;
  }

  return (
    <div className="mt-4">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="mb-4 p-2 border rounded comment-container">
          {editingCommentId === comment.id ? (
            <div>
              <textarea
                value={editingComment}
                onChange={(e) => setEditingComment(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleUpdateComment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditingCommentId(null)}
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-start items-start">
              <div className="mr-2">
                <span
                  style={{
                    display: 'inline-block',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: getRandomColor(),
                    textAlign: 'center',
                    fontSize: '14px',
                    lineHeight: '30px',
                    color: '#fff',
                  }}
                >
                  {getInitials(comment.account.firstName, comment.account.lastName)}
                </span>
              </div>
              <div className="flex-1">
                <p className="mb-1">{comment.comment}</p>
                <p className="text-sm text-gray-500">
                  {comment.account.firstName} {comment.account.lastName} • {new Date(comment.createdAt).toLocaleString()}
                </p>
                <div className="flex justify-end">
                  <span
                    onClick={() => handleEditComment(comment)}
                    className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleDeleteComment(comment.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getInitials(firstName: string | undefined, lastName: string | undefined) {
  if (!firstName || !lastName) {
    return '';
  }
  return firstName.charAt(0) + lastName.charAt(0);
}

export default CommentList;
