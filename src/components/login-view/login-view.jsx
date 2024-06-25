import React from "react";
import { useState } from "react";

export const LoginView = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            access: name,
            secret: password
        };

        fetch("https://logan-myflix-30a490a6c5c0.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </label>
        <label>
          Password:
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };