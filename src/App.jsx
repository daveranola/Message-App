// App.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "./services/api";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LogInForm";
import "./App.css";

function App({ setLoggedinId }) {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

const addUser = (name, email, password) => {
  return userService.create({ name, email, password })
    .then(() => userService.getAll())
    .then(res => setUsers(res.data))
    .catch(err => {
      if (err.response && err.response.status === 409) {
        // Pass the backend error message up to the form
        throw new Error(err.response.data.message || "Email already in use");
      }
      throw err; // rethrow for unexpected errors
    });
};

  const checkUser = (name, email, password) => {
    const user = users.find(u => u.name === name && u.email === email && u.password === password);
    if (user) {
      setLoggedinId(user.id);
      navigate("/message");
    } else alert("Invalid credentials.");
  };

  return (
    <div className="app-container">
      <div className="background-animation">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="form-center-wrapper">
        <div className="form-card">
          <div className="form-header">
            <h2 className="text-center mb-2">Welcome</h2>
            <p className="text-center text-muted">
              {showLogin ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <div className={`form-wrapper ${showLogin ? "show-login" : "show-signup"}`}>
            {showLogin ? (
              <LoginForm checkUser={checkUser} />
            ) : (
              <SignUpForm addUser={addUser} />
            )}
          </div>

          <div className="text-center mt-4">
            <div className="divider">
              <span>Or</span>
            </div>
            
            <button
              className="btn btn-switch"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? 
                <><span>Create an account</span> <i className="arrow">→</i></> : 
                <><i className="arrow">←</i> <span>Back to login</span></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;