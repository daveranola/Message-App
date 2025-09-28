import React, { useState } from "react";

function SignUpForm({ addUser }) {
  const [signUpName, setSignUpName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [error, setError] = useState('');  // NEW: track error message

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    addUser(signUpName, signUpEmail, signUpPassword)
      .then(() => {
        setSignUpName('');
        setSignUpEmail('');
        setSignUpPassword('');
      })
      .catch(err => {
        setError(err.message); // show backend or thrown error
      });
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

      {/* Error message shown here */}
      {error && <div className="text-danger mb-2">{error}</div>}

      <button type="submit" className="btn btn-success w-100">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
