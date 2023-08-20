import React, { useState, useEffect } from "react";
import Login from "../login/Login";
import QuoteForm from "../quotes/QuoteForm";
import "../main/main.scss";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          Main Content
          <QuoteForm userId={userId} />
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />
      )}
    </div>
  );
}

export default Main;
