import React, { useState } from "react";
import "../login/login.scss";

/**
 * Login component for user authentication.
 *
 * @component
 * @param {Object} props
 * @param {function} props.setIsLoggedIn - Callback to set the login status.
 * @param {function} props.setUserId - Callback to set the user's ID.
 * @param {function} props.setUsername - Callback to set the username.
 *
 * @example
 * <Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} setUsername={setUsername} />
 */
function Login({ setIsLoggedIn, setUserId, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles the login procedure by making an API call.
   * Sets appropriate state on successful/unsuccessful login.
   *
   * @async
   * @function
   */
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:80/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUserId(data.id);
        setUsername(data.username);
        console.log("Set username in Login:", data.username);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.username);
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>
          Username:
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
