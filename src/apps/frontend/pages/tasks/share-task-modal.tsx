import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../../components/modal';
import {
  Button,
  VerticalStackLayout,
  Spinner,
  LabelLarge,
  ParagraphSmall,
} from '../../components';
import { ButtonKind, ButtonSize } from '../../types/button';

interface ShareTaskModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleShareTask: (userId: string) => void;
}

const ShareTaskModal: React.FC<ShareTaskModalProps> = ({
  isOpen,
  setIsOpen,
  handleShareTask,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/users');
        console.log('Fetched users:', response.data); // Debugging log
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleShare = (userId: string) => {
    handleShareTask(userId);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsOpen(false)}
          kind={ButtonKind.TERTIARY}
          startEnhancer={
            <img
              src="assets/svg/close-icon.svg"
              alt="close-icon"
              className="fill-current"
            />
          }
        />
      </div>
      <VerticalStackLayout gap={4}>
        <LabelLarge>Select a user to share the task with:</LabelLarge>
        {isLoading ? (
          <Spinner />
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border-b pb-2 mb-2"
            >
              <ParagraphSmall>{user.name}</ParagraphSmall>
              <Button
                onClick={() => handleShare(user.id)}
                kind={ButtonKind.PRIMARY}
                size={ButtonSize.MINI}
              >
                Share
              </Button>
            </div>
          ))
        ) : (
          <ParagraphSmall>No users available</ParagraphSmall>
        )}
      </VerticalStackLayout>
    </Modal>
  );
};

export default ShareTaskModal;
