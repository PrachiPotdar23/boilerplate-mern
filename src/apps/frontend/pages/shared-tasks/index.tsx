import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { VerticalStackLayout, HeadingMedium } from '../../components';
import { useTaskContext } from '../../contexts';
import { Task } from '../../types/task';

const SharedTasks: React.FC = () => {
  const { getSharedTasks, isGetSharedTasksLoading, sharedTasksList, getTasks } = useTaskContext();
  
  const userAccessToken = JSON.parse(localStorage.getItem('access-token'));
  const accountId = useMemo(() => userAccessToken.accountId, [userAccessToken]);

  const getSharedTasksCallback = useCallback(() => {
    getSharedTasks(accountId);
    getTasks();
  }, [getSharedTasks, accountId]);

  useEffect(() => {
    getSharedTasksCallback();
  }, [accountId]);

  console.log(accountId);
  console.log('sharedTasksList:', sharedTasksList);
  console.log('isGetSharedTasksLoading:', isGetSharedTasksLoading);

  const [commentOpen, setCommentOpen] = useState({});

  const handleCommentClick = (taskId: string) => {
    setCommentOpen((prevOpen) => ({ ...prevOpen, [taskId]: !prevOpen[taskId] }));
  };

  const handleReplyComment = (commentId: number) => {
    console.log(`Replying to comment ${commentId}`);
  };

  return (
    <div className="mx-auto h-screen max-w-screen-2xl overflow-y-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-5xl">
        <VerticalStackLayout gap={7}>
          <HeadingMedium>Shared Tasks</HeadingMedium>
          {isGetSharedTasksLoading ? (
            <div>Loading...</div>
          ) : (
            sharedTasksList.map((sharedTask) => (
              <div
                key={sharedTask.id}
                className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
              >
                {sharedTask.task && (
                  <>
                    <h3 className="text-lg font-semibold">
                      Title: {sharedTask.task.title || 'No title'}
                    </h3>
                    <p>Description: {sharedTask.task.description || 'No description'}</p>
                  </>
                )}
                <p className="text-sm text-gray-500">
                  shared by: {sharedTask.sharedBy ? sharedTask.sharedBy.firstName : 'Unknown'}
                </p>
                <p className="text-sm text-gray-500">
                  Shared at: {new Date(sharedTask.sharedAt).toLocaleString()}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleCommentClick(sharedTask.task ? sharedTask.task.taskId : '')}
                >
                  Comment
                </button>
                {commentOpen[sharedTask.task ? sharedTask.task.taskId : ''] && (
                  <div className="mt-4">
                    <h4>Comments</h4>
                    <ul>
                      <li>
                        <p>Comment 1</p>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleReplyComment(1)}
                        >
                          Reply
                        </button>
                      </li>
                      <li>
                        <p>Comment 2</p>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleReplyComment(2)}
                        >
                          Reply
                        </button>
                      </li>
                    </ul>
                    <form>
                      <input type="text" placeholder="Add new comment" />
                      <button>Post</button>
                    </form>
                  </div>
                )}
              </div>
            ))
          )}
        </VerticalStackLayout>
      </div>
    </div>
  );
};

console.log("index.tsx", Task);

export default SharedTasks;