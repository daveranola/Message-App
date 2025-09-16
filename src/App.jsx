import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data))
      // res.data = json array which userService.getAll() returns
      .catch(err => console.error(err));
  }, []);

  const addUser = () => {
    userService.create({ name, email, password })
      .then(res => {
        console.log(res.data); // "Saved"
        return userService.getAll(); // refresh list
      })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const checkUser = () => {
    const user = users.find(u => u.name === name && u.email === email && u.password === password);
    if (user) {
      navigate('/message'); // navigate to Message component
    } else {
      alert('Invalid credentials.');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      {/* <>e.target.value = value inside element in this case input</>  */}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={addUser}>Sign Up</button>
      
      <h1>Login</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={checkUser}>Login</button>

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

export default App;
