import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Button,
  HeadingSmall,
  LabelLarge,
  MenuItem,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Task } from '../../types/task';

import TaskModal from './task-modal';
import ShareTaskModal from './share-task-modal';
import useTaskForm from './tasks-form.hook';
import axios from 'axios';

interface TaskSectionProps {
  handleDeleteTask: (taskId: string) => void;
  isGetTasksLoading: boolean;
  onError?: (error: AsyncError) => void;
  tasks: Task[];
}

const TaskSection: React.FC<TaskSectionProps> = ({
  handleDeleteTask,
  isGetTasksLoading,
  onError,
  tasks,
}) => {
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [shareTaskModal, setShareTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onSuccess = () => {
    toast.success('Task has been updated successfully');
    setUpdateTaskModal(false);
  };

  const onShareSuccess = () => {
    toast.success('Task has been shared successfully');
    setShareTaskModal(false);
  };

  const { updateTaskFormik, setFormikFieldValue } = useTaskForm({
    onError,
    onSuccess,
  });

  const handleTaskOperation = (task: Task) => {
    setUpdateTaskModal(true);
    setFormikFieldValue(updateTaskFormik, 'title', task.title);
    setFormikFieldValue(updateTaskFormik, 'id', task.id);
    setFormikFieldValue(updateTaskFormik, 'description', task.description);
  };

  const handleShareTaskOperation = (task: Task) => {
    setSelectedTask(task);
    setShareTaskModal(true);
  };

  const handleShareTask = async (userId: string) => {
    if (!selectedTask) return;
    try {
      await axios.post(`/api/tasks/${selectedTask.id}/share`, {
        userIds: [userId],
      });
      onShareSuccess();
    } catch (error) {
      if (onError) onError(error);
    }
  };

  if (isGetTasksLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <VerticalStackLayout gap={7}>
      {tasks.length > 0 && (
        <HeadingSmall>
          To Do's ({tasks.length >= 10 ? Math.floor(tasks.length / 10) : '0'}
          {tasks.length % 10})
        </HeadingSmall>
      )}

      {tasks.map((task) => (
        <div
          className="relative rounded-sm border border-stroke bg-white p-9 shadow-default"
          key={task.id}
        >
          <VerticalStackLayout gap={3}>
            <LabelLarge>{task.title}</LabelLarge>
            <ParagraphSmall>{task.description}</ParagraphSmall>
          </VerticalStackLayout>

          <div className="absolute right-4 top-4">
            <MenuItem>
              <Button
                onClick={() => handleTaskOperation(task)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                }
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                }
              >
                Delete
              </Button>
              <Button
                onClick={() => handleShareTaskOperation(task)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/share-icon.svg" alt="Share task" />
                }
              >
                Share
              </Button>
            </MenuItem>
          </div>
        </div>
      ))}

      <TaskModal
        formik={updateTaskFormik}
        isOpen={updateTaskModal}
        setIsOpen={setUpdateTaskModal}
        btnText={'Update Task'}
      />
      <ShareTaskModal
        isOpen={shareTaskModal}
        setIsOpen={setShareTaskModal}
        handleShareTask={handleShareTask}
      />
    </VerticalStackLayout>
  );
};

export default TaskSection;
