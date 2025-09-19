import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "./services/api";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LogInForm";
import UserList from "./components/UserList";

function App({ setLoggedinId }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const addUser = (name, email, password) => {
    userService.create({ name, email, password })
      .then(() => userService.getAll())
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const checkUser = (name, email, password) => {
    const user = users.find(u => u.name === name && u.email === email && u.password === password);
    if (user) {
      setLoggedinId(user.id);
      navigate("/message");
    } else alert("Invalid credentials.");
  };

  return (
    <div>
      <h1>Sign Up / Login</h1>
      <SignUpForm addUser={addUser} />
      <LoginForm checkUser={checkUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
