// UserList.jsx
function UserList({ users }) {
  return (
    <div className="user-list-card">
      <h3 className="user-list-title">Registered Users</h3>
      <div className="user-list-content">
        {users.length > 0 ? (
          <ul className="user-list">
            {users.map((u) => (
              <li key={u.id} className="user-list-item">
                <span className="user-name">{u.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-users-message">No users found</p>
        )}
      </div>
    </div>
  );
}

export default UserList;