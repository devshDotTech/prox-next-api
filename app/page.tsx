// import Image from "next/image";
"use client"
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import { useState } from "react";

interface Data {
  ProxmoxApiUrl: string,
  username: string,
  password: string,
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");
  
  const [auth, setAuth] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data : Data = {
        ProxmoxApiUrl: apiUrl,
        username: username,
        password: password
      }
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        },
      })
      const result = await res.json();
      console.log(result)
      if(result.authenticated) {
        setAuth(true);
      }
      alert(`Authenticated: ${result.authenticated}`)
      setUsername(result.username);

    } catch (error) {
      console.log(error)
    }
  }
  if (!auth) {
    return (
      <div className=" ">
        <Login setUsername={setUsername} setPassword={setPassword} setApiUrl={setApiUrl} handleLogin={handleSubmit} />
      </div>
    )
  }
  return (
    <div>
      <Landing username={username} />
    </div>
  )
}
