"use client";

import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { navigateHomepage, navigateRegister } from "@/app/utils/navigate";
import axios from "axios";
import { Button } from "primereact/button";
import styles from "../styles/Login.css";

export default function Login() {
  const toast = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      console.log("Login successful:", response.data);
      await navigateHomepage();
    } catch (error) {
      console.error("Login failed:", error);
      toast.current.show({
        severity: "error",
        summary: "Login Error",
        detail: "Invalid username or password",
      });
    }
  };

  const handleRegisterClick = async () => {
    await navigateRegister();
  };

  return (
    <div>
      <Toast ref={toast}></Toast>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div>
              <label>Username </label>
              <InputText
                className={styles.inputForm}
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username/email"
              />
            </div>
            <div>
              <label>Password </label>
              <InputText
                className={styles.inputForm}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <div className={styles.buttonAlignment}>
              <Button type="submit" raised label="Login" />
              <Button
                onClick={handleRegisterClick}
                label="Register"
                className={styles.pButton}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
