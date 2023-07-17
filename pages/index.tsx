import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
        setError("Invalid username or password");
      }
    };

  return (
    <section>
      <div>
        <Head>
          <title>Login Page</title>
        </Head>
        <h1>Login</h1>
        {error && <p>Error:{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}


  export default LoginPage;