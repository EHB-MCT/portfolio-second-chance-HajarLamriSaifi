import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import QuoteForm from "../quotes/QuoteForm";
import QuoteList from "../quotes/QuoteList";
import "../main/main.scss";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      const retrievedUsername = localStorage.getItem("username");
      setUsername(retrievedUsername);
      console.log("Username from localStorage in Main:", retrievedUsername);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <div className="main-container">
      {isLoggedIn ? (
        <>
          <div className="header">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <QuoteForm userId={userId} />
          <QuoteList />
        </>
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
