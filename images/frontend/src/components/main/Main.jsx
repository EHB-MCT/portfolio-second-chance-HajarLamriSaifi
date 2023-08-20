import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import QuoteForm from "../quotes/QuoteForm";
import "../main/main.scss";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername(""); // Clear username
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="header">
            <span>Welcome, {username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          Main Content
          <QuoteForm userId={userId} />
        </div>
      ) : (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setUserId={setUserId}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default Main;
