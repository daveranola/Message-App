import React, { useState } from "react";

function LogInForm( { checkUser } ) {
  const [loggedInName, setLoggedInName] = useState('');
  const [loggedInPassword, setLoggedInPassword] = useState('');
  const [loggedInEmail, setLoggedInEmail] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Name" value={loggedInName} onChange={e => setLoggedInName(e.target.value)} />
      <input placeholder="Email" value={loggedInEmail} onChange={e => setLoggedInEmail(e.target.value)} />
      <input placeholder='Password' value={loggedInPassword} onChange={e => setLoggedInPassword(e.target.value)} />
      <button onClick={() => checkUser(loggedInName, loggedInEmail, loggedInPassword)}>Login</button>
    </div>
  );
}

export default LogInForm;
