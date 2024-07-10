import React, { PropsWithChildren, useState, useContext } from 'react';
import { createContext} from 'react';
import { ApiResponse, ApiError, AsyncError } from '../types';
import { SharedTask } from '../types/shared-task';
import TaskService from '../services/task.service';
import useAsync from './async.hook';
type SharedTasksContextType = {
  getSharedTasks: (accountId: string) => Promise<SharedTask[]>;
  getSharedTasksError: AsyncError;
  isGetSharedTasksLoading: boolean;
  sharedTasksList: SharedTask[];
  setSharedTasksList: React.Dispatch<React.SetStateAction<SharedTask[]>>;
};

const SharedTasksContext = createContext<SharedTasksContextType | null>(null);

const taskService = new TaskService();

export const useSharedTasksContext = (): SharedTasksContextType => useContext(SharedTasksContext);

const getSharedTasksFn = async (accountId: string): Promise<ApiResponse<SharedTask[]>> => {
  try {
    const response = await taskService.getSharedTasks(accountId);
    return response;
  } catch (e) {
    return new ApiResponse([], new ApiError(e));
  }
};

export const SharedTasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sharedTasksList, setSharedTasksList] = useState<SharedTask[]>([]);

  const {
    asyncCallback: getSharedTasks,
    error: getSharedTasksError,
    isLoading: isGetSharedTasksLoading,
  } = useAsync(getSharedTasksFn);

  return (
    <SharedTasksContext.Provider
      value={{
        getSharedTasks,
        getSharedTasksError,
        isGetSharedTasksLoading,
        sharedTasksList,
        setSharedTasksList,
      }}
    >
      {children}
    </SharedTasksContext.Provider>
  );
};
