import React, { useState } from 'react';

function SignUpForm( { addUser } ) {
  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  return (
    <div>
      <h1>Sign Up</h1>
      <input placeholder="Name" value={signUpName} onChange={e => setSignUpName(e.target.value)} />
      {/* <>e.target.value = value inside element in this case input</>  */}
      <input placeholder="Email" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} />
      <input placeholder='Password' value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} />
      <button onClick={() => addUser(signUpName, signUpEmail, signUpPassword)}>Sign Up</button>
    </div>
  );
}

export default SignUpForm;
