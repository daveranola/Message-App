import React, { useState } from 'react';

function SignUpForm( { addUser } ) {
  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // stop browser reload wgen form is submitted
    addUser(signUpName, signUpEmail, signUpPassword);
  };

  return (
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        
        <input 
          placeholder="Name" 
          value={signUpName} 
          onChange={(e) => setSignUpName(e.target.value)} 
          required
          maxLength={20} //name cannot exceed 20 characters
        />

        <input
          type="email"
          placeholder="Email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          required
          pattern=".+@gmail\.com"
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={signUpPassword} 
          onChange={(e) => setSignUpPassword(e.target.value)} 
          required
          minLength={6} //must be at least 6 characters long
        />

        <button type="submit">Sign Up</button>
    </form>

  );
}

export default SignUpForm;
