import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    // Clear previous errors
    setUsernameError(null);
    setPasswordError(null);

    // Validation for username
    if (username.trim().length < 8) {
      setUsernameError("Username must be at least 8 characters long");
      return;
    }

    // Validation for password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain 1 capital letter, 2 numbers, and 1 special character"
      );
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
          }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} style={{margin: "15px", border: "15px", padding: "15px"}} >
        <div style={{ padding: "10px", margin: "10px" }}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              
            />
          </label>
          
        </div>
        <div style={{ padding: "10px", margin: "10px" }}>
          <label>
            Password:{" "}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "31px" }}
            />
            {/* Toggle password visibility */}
            {showPassword ? (
              <FaEyeSlash style={{ paddingLeft: "10px" }} onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye style={{ paddingLeft: "10px" }} onClick={() => setShowPassword(true)} />
            )}
          </label>
          
          {usernameError && <p style={{ color: "red", padding: "4px", margin: "0px", border:"0px" }}>{usernameError}</p>}
          {passwordError && <p style={{ color: "red", padding: "4px", margin: "0px", border:"0px" }}>{passwordError}</p>}
          
        </div>
        <button style={{ margin: "10px", backgroundColor: "green" }}>Submit</button>
      </form>
    </>
  );
}
