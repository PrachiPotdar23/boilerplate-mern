// frontend/pages/shared-tasks/index.tsx

import React, { useEffect, useCallback, useMemo } from 'react';
import { VerticalStackLayout, HeadingMedium } from '../../components';
import { useTaskContext } from '../../contexts';
import CommentList from '../tasks/comment-show';
import AddComment from '../tasks/add-comment';

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
  console.log("share task se",sharedTasksList);

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
                    <p className="text-sm text-gray-500">
                      shared by: {sharedTask.task.account?.firstName + ' ' + sharedTask.task.account?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Shared at: {new Date(sharedTask.task.createdAt).toLocaleString()}
                    </p>
                    <CommentList taskId={sharedTask.task._id} /> 
                    
                  </>
                  
                )}
                
                <AddComment taskId={sharedTask.task._id} />
                
              </div>
            ))
          )}
        </VerticalStackLayout>
      </div>
    </div>
  );
};


export default SharedTasks;
