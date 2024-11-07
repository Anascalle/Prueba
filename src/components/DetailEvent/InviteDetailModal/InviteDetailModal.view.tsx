import React from 'react';

interface User {
  id: string;
  username: string;
  img: string;
}

interface ModalInviteViewProps {
  closeModal: () => void;
  handleInviteUser: () => Promise<void>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  filteredUsers: User[];
  selectedUsers: User[];
  handleUserSelect: (user: User) => void;
  handleRemoveUser: (userId: string) => void;
}

const ModalInviteView: React.FC<ModalInviteViewProps> = ({
  closeModal,
  handleInviteUser,
  searchValue,
  setSearchValue,
  filteredUsers,
  selectedUsers,
  handleUserSelect,
  handleRemoveUser,
}) => {
  const highlightMatch = (username: string) => {
    const parts = username.split(new RegExp(`(${searchValue})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchValue.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <button className="closemodal_button" onClick={closeModal}>x</button>
        <h1 className="add_title">Add a new guest</h1>
        
        <input
          type="text"
          placeholder="Guest name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="searchInput"
        />
        
        {searchValue.trim() !== '' && (
          <>
            {filteredUsers.length === 0 ? (
              <p>No users found</p>
            ) : (
              <div className="user-list">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="user-item" onClick={() => handleUserSelect(user)}>
                    <img src={user.img} alt={user.username} className="user-image" />
                    <p className="user-name">{highlightMatch(user.username)}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <h3 className="sent_title">Sent to</h3>
        
        <div className="selected-users">
          {selectedUsers.map((user) => (
            <div key={user.id} className="selected-user-card">
              <img src={user.img} alt={user.username} className="selected-user-image" />
              <p id="selected_user_name">{user.username}</p>
              <button
                className="eliminate_guest"
                onClick={() => handleRemoveUser(user.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        
        <div className="modalActions">
          <button
            className="Addguest_button"
            onClick={handleInviteUser}
            disabled={selectedUsers.length === 0}
          >
            Add guests
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInviteView;
