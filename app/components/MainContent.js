"use client";

import Link from "next/link";
import styles from "../styles/MainContent.css";
import { useEffect, useState } from "react";
import getNovels from "@/app/utils/getNovels";

export default function MainContent() {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getNovels();
      setNovels(data);
    })();
  }, []);

  return (
    <div className={styles.mainContent}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Fictional Novels</h2>
        <div
          className={styles.content}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {novels.map((novel) => (
            <Link
              href={`/novel/${novel.novelUrl}`}
              key={novel.novelUrl}
              className={styles.novelLink}
              prefetch={true}
            >
              <div className={`novel ${novel.id === "new" ? "novel-new" : ""}`}>
                {novel.id === "new" ? (
                  <div className={styles.novelCreate}>
                    <span className={styles.createIcon}>+</span>
                    <span className={styles.createText}>Create New Novel</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={novel.imageUrl}
                      alt={novel.title}
                      className={styles.novelCover}
                    />
                    <div className={styles.novelDetails}>
                      <h3>{novel.title}</h3>
                      <p>{novel.excerpt}</p>
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
