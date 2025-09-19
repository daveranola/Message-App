function UserList( { users } ) {
  return (
    <div>
      {/* displays users in data base (mySQL) */}
      <h1>Database</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.email} - {u.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
