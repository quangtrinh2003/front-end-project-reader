"use client";

import styles from "../styles/Header.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import checkJWT from "@/app/utils/checkJWT";
import deleteJWT from "@/app/utils/deleteJWT";

export default function Header() {
  const [jwt, setJwt] = useState();

  useEffect(() => {
    (async () => {
      const data = await checkJWT();
      setJwt(data);
    })();
  }, []);

  const handleSubmit = async function () {
    await deleteJWT();
    setJwt("");
  };

  if (!jwt) {
    return (
      <div className={styles.header}>
        <div className={styles.headerRight}>
          <div className={styles.loginRegisterLinks}>
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
            <span className={styles.divider}> / </span>
            <Link href="/register" className={styles.registerLink}>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerRight}>
        <div className={styles.loginRegisterLinks}>
          <Link href="/upload" className={styles.registerLink}>
            Upload
          </Link>
          <span className={styles.divider}> / </span>
          <Link href="/" onClick={handleSubmit}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
