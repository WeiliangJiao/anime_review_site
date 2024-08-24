import React, { useState } from "react";
import { signUp, logIn } from "../services/api";

const Auth = ({ onClose, setAuthToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const authFunction = isLogin ? logIn : signUp;
    authFunction({ username, password })
      .then((response) => {
        console.log("Authentication response:", response);
        const parsedData = response.data;
        const token = parsedData.token;
        const userId = parsedData.userId;
        const userName = parsedData.userName;
        setAuthToken(token);
        console.log("parsedData:", parsedData);
        console.log("token:", token);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
        onClose();
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });
  };

  return (
    <div className="auth">
      <button onClick={onClose}>Close</button>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Auth;
