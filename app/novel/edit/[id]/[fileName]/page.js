"use client";

import { useEffect, useState } from "react";
import getChapter from "@/app/utils/getChapter";
import { InputTextarea } from "primereact/inputtextarea";
import styles from "@/app/styles/Upload.css";
import { Button } from "primereact/button";
import { navigateHomepage } from "@/app/utils/navigate";
import axios from "axios";
import checkJWT from "@/app/utils/checkJWT";
import checkAuthorized from "@/app/utils/checkAuthorized";

export default function EditChapter({ params }) {
  const { id: novelUrl, fileName } = params;
  const [text, setText] = useState([]);
  const [editedChapterName, setEditedChapterName] = useState("");
  const [editedText, setEditedText] = useState("");
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    (async () => {
      let token = await checkJWT();
      if (token) {
        const status = await checkAuthorized(novelUrl, token.value);
        if (!status) {
          await navigateHomepage();
        }
        setJwt(token.value);
      }
      const data = await getChapter(novelUrl, fileName);
      setText(data.split("\n"));
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = `${editedChapterName}\n${editedText}`;
      // Send POST request to create novel
      const response = await axios.patch(
        `http://localhost:3001/api/v1/novels/edit/${novelUrl}/${fileName}`,
        {
          data,
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
        console.error("Failed to edit novel");
      }
    } catch (error) {
      await navigateHomepage();
    }
  };

  return (
    <div>
      <div>
        <label>Chapter name:</label>
        <InputTextarea
          autoResize
          id="chapterName"
          defaultValue={text[0]}
          onChange={(e) => setEditedChapterName(e.target.value)}
          readOnly={false}
          required
        />

        <p>
          <InputTextarea
            cols={80}
            rows={text.length * 20}
            id="content"
            defaultValue={text.slice(1)}
            onChange={(e) => setEditedText(e.target.value)}
            required
          />
        </p>
        <div className={styles.buttonGroup}>
          <Button label="Upload" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
