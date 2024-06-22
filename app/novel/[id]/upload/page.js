"use client";

import styles from "@/app/styles/Register.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import { ProgressBar } from "primereact/progressbar";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import axios from "axios";
import checkJWT from "@/app/utils/checkJWT";
import { navigateHomepage } from "@/app/utils/navigate";
import checkAuthorized from "@/app/utils/checkAuthorized";

export default function UploadChapter({ params }) {
  const { id: novelUrl } = params;
  const [chapterName, setChapterName] = useState("");
  const [text, setText] = useState("");
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
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = `${chapterName}\n${text}`;
      const response = await axios.post(
        `${process.env.URL}/api/v1/novels/upload/${novelUrl}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      if (response.data.status === "success") {
        // Navigate to homepage or refresh to fetch updated novel list
        await navigateHomepage();
      } else {
        console.error("Failed to create chapter");
      }
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  return (
    <div>
      <div>
        <form>
          <div>
            <label>Chapter name:</label>
            <InputText
              autoFocus
              type="text"
              placeholder="Enter chapter name"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Text:</label>
            <InputTextarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={5}
              cols={30}
              autoResize
            />
          </div>

          <div>
            <Button onClick={handleSubmit} raised label="Upload" />
          </div>

          <section>
            <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
          </section>
        </form>
      </div>
    </div>
  );
}
