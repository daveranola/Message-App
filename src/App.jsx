import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from './services/api';

function App( { setLoggedinId} ) {
  

  const [users, setUsers] = useState([]);

  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  
  const [loggedInName, setLoggedInName] = useState('');
  const [loggedInPassword, setLoggedInPassword] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');

  const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data))
      // res.data = json array which userService.getAll() returns
      .catch(err => console.error(err));
  }, []);

  const addUser = () => {
  userService.create({ name: signUpName, email: signUpEmail, password: signUpPassword })
    .then(res => {
      console.log(res.data); // "Saved"
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPassword('');
      return userService.getAll(); // refresh list
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error(err));
};

  const checkUser = () => {
    const user = users.find(u => u.name === loggedInName && u.email === loggedInEmail && u.password === loggedInPassword);
    if (user) {
      setLoggedinId(user.id);
      navigate('/message'); // navigate to Message component
    } else {
      alert('Invalid credentials.');
    }
  }

  

  return (
    <div>
      <h1>Sign Up</h1>

      <input placeholder="Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
      {/* <>e.target.value = value inside element in this case input</>  */}
      <input placeholder="Email" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
      <input placeholder='Password' value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} />
      <button onClick={addUser}>Sign Up</button>
      
      <h1>Login</h1>
      <input placeholder="Name" value={loggedInName} onChange={e => setLoggedInName(e.target.value)} />
      <input placeholder="Email" value={loggedInEmail} onChange={e => setLoggedInEmail(e.target.value)} />
      <input placeholder='Password' value={loggedInPassword} onChange={e => setLoggedInPassword(e.target.value)} />
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
