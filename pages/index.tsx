import { useState } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/profile");
    } else {
      setError("You have entered an invalid username or password. Try again");
    }
  };

  return (
    <section>
      <div>
        <Head>
          <title>Login Page</title>
        </Head>
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="control">
            <label htmlFor="username">Username </label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="actions">
            <button type="submit">Login</button>
          </div>
          <div>{error && <p className="errortext">Error: {error}</p>}</div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
