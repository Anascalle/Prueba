import React, { useState, useEffect } from 'react';
import ModalInviteView from './InviteDetailModal.view';
import "./InviteDetailModal.css";

interface User {
  id: string;
  username: string;
  img: string;
}

interface ModalInviteProps {
  users: User[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  closeModal: () => void;
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
}

const ModalInvite: React.FC<ModalInviteProps> = ({
  users,
  searchValue,
  setSearchValue,
  closeModal,
  selectedUsers,
  setSelectedUsers,
  handleInviteUser,
}) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 800); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchValue(''); 
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  return (
    <ModalInviteView
      closeModal={closeModal}
      handleInviteUser={handleInviteUser}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      filteredUsers={filteredUsers}
      selectedUsers={selectedUsers}
      handleUserSelect={handleUserSelect}
      handleRemoveUser={handleRemoveUser}
    />
  );
};

export default ModalInvite;
