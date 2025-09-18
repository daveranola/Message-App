import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Message from "./Message";

function Main() {
  const [loggedinId, setLoggedinId] = useState(null); // store logged-in user here

  return (
    <Router>
      <Routes>
        {/* pass setLoggedinId to App so it can update the state on login */}
        <Route path="/" element={<App setLoggedinId={setLoggedinId} />} />
        {/* pass loggedinId to Message so it knows who is logged in */}
        <Route path="/message" element={<Message loggedinId={loggedinId} />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
