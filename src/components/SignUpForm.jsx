// SignUpForm.jsx
import React, { useState } from "react";

function SignUpForm({ addUser }) {
  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(signUpName, signUpEmail, signUpPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input 
          className="form-control"
          placeholder="Name"
          value={signUpName}
          onChange={(e) => setSignUpName(e.target.value)}
          required
          maxLength={20}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          required
          pattern=".+@gmail\.com"
        />
      </div>
      <div className="mb-3">
        <input 
          type="password"
          className="form-control"
          placeholder="Password"
          value={signUpPassword}
          onChange={(e) => setSignUpPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit" className="btn btn-success w-100">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
