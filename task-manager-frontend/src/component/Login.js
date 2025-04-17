import React from "react";

const Login = () => {
  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Login to Task Manager</h2>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
