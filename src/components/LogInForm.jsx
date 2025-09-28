  import React, { useState } from "react";

  function LogInForm({ checkUser, successMessage }) {
    const [loggedInName, setLoggedInName] = useState("");
    const [loggedInPassword, setLoggedInPassword] = useState("");
    const [loggedInEmail, setLoggedInEmail] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      checkUser(loggedInName, loggedInEmail, loggedInPassword);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Name"
            value={loggedInName}
            onChange={(e) => setLoggedInName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={loggedInEmail}
            onChange={(e) => setLoggedInEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={loggedInPassword}
            onChange={(e) => setLoggedInPassword(e.target.value)}
            required
          />
        </div>

        {successMessage && <div className="text-success mb-2">{successMessage}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    );
  }

  export default LogInForm;
