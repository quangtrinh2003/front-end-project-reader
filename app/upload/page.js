"use client";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { navigateHomepage } from "@/app/utils/navigate";
import checkJWT from "@/app/utils/checkJWT";
import styles from "../styles/Upload.css";
import axios from "axios";

export default function Upload() {
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    (async () => {
      let token = await checkJWT();
      if (!token) {
        await navigateHomepage();
      } else {
        setJwt(token.value);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to create novel
      const response = await axios.post(
        "http://localhost:3001/api/v1/novels/upload",
        {
          title,
          author,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      // Check if novel creation was successful
      if (response.data.status === "success") {
        // Navigate to homepage or refresh to fetch updated novel list
        await navigateHomepage();
      } else {
        console.error("Failed to create novel");
      }
    } catch (error) {
      console.error("Error creating novel:", error);
    }
  };

  return (
    <div className={styles.createNovelContainer}>
      <h2>Create New Novel</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Author:</label>
          <InputText
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <InputTextarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            cols={30}
            autoResize
          />
        </div>

        <div className={styles.buttonGroup}>
          <Button
            type="submit"
            label="Create Novel"
            className="p-button-success"
          />
          <Button
            type="button"
            label="Cancel"
            className="p-button-secondary"
            onClick={navigateHomepage}
          />
        </div>
      </form>
    </div>
  );
}
