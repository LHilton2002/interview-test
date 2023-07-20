import { useState } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import classes from "./index.module.css";
import "styles/globals.css"

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
    <section className="min-h-screen bg-red-400 flex items-center justify-center">
      <Head>
        <title>Login Page</title>
      </Head>
      <form className={classes.form} onSubmit={handleLogin}>
        <div className={classes.control}>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            id="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
        <div>{error && <p className="errortext">Error: {error}</p>}</div>
      </form>
      </section>
  );
};


export default LoginPage;
