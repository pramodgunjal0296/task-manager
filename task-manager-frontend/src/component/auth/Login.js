import React from "react";
const Login = () => {
  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div
      style={{
        padding: "4rem",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        maxWidth: "400px",
        margin: "6rem auto"
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          marginBottom: "2rem",
          color: "#111827"
        }}
      >
        Login to Task Manager
      </h2>
      <button
        onClick={googleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#fff",
          color: "#333",
          border: "1px solid #ccc",
          borderRadius: "8px",
          fontWeight: 500,
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
        onMouseOver={e => {
          e.currentTarget.style.backgroundColor = "#f1f5f9";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.backgroundColor = "#fff";
          e.currentTarget.style.transform = "none";
        }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google icon"
          style={{ width: "20px", height: "20px" }}
        />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
