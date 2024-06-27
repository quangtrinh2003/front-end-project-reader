"use client";

import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import { ProgressBar } from "primereact/progressbar";
import { useRef, useState } from "react";
import axios from "axios";
import styles from "../styles/Register.css";
import { navigateHomepage } from "@/app/utils/navigate";

export default function Register() {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        toast.current.show({
          severity: "error",
          summary: "Password Error",
          detail: "Passwords do not match",
        });
        return;
      }

      // Make POST request to register endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/users/register`,
        {
          username,
          password,
          passwordConfirm: password,
        },
        { withCredentials: true },
      );

      console.log("Registration successful:", response.data); // Example: Handle success
      await navigateHomepage();
      // Example: Redirect user or set authentication state
    } catch (error) {
      console.error("Registration failed:", error); // Example: Handle error
      // Example: Show error message to user using toast
      toast.current.show({
        severity: "error",
        summary: "Registration Error",
        detail: "Registration failed. Please try again later.",
      });
    }
  };

  return (
    <div>
      <Toast ref={toast}></Toast>
      <div className={styles.registerContainer}>
        <div className={styles.branding}>Your Website Branding</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Username </label>
            <InputText
              className={styles.inputForm}
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <small className={styles.smallText}>*Enter your username</small>
          </div>

          <div>
            <label>Password </label>
            <InputText
              className={styles.inputForm}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <small className="small-text">*Enter your password</small>
          </div>

          <div>
            <label>Confirm Password </label>
            <InputText
              className={styles.inputForm}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <div className={styles.buttonAlignment}>
            <Button type="submit" raised label="Register" />
            <Link href="/login" className={styles.loginLink}>
              Already have an account? Login here
            </Link>
          </div>

          <section className={styles.progressBarSection}>
            <ProgressBar
              hidden={!visible}
              mode="indeterminate"
              style={{ height: "6px" }}
            />
          </section>

          <span style={{ color: "red" }} hidden={true}>
            *Invalid Password
          </span>
        </form>
      </div>
    </div>
  );
}
