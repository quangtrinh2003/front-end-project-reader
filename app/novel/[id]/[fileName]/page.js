"use client";

import { useEffect, useState } from "react";
import getChapter from "@/app/utils/getChapter";
import Link from "next/link";
import checkJWT from "@/app/utils/checkJWT";
import checkAuthorized from "@/app/utils/checkAuthorized";
import deleteNovelChapter from "@/app/utils/deleteNovelChapter";
import { navigateHomepage } from "@/app/utils/navigate";

export default function Chapter({ params }) {
  const { id: novelUrl, fileName } = params;
  const [text, setText] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await checkJWT();

      if (token) {
        const status = await checkAuthorized(novelUrl, token.value);
        setIsAuthorized(status);
      }

      const data = await getChapter(novelUrl, fileName);
      setText(data.split("\n"));
    })();
  }, []);

  const handleDelete = async function (e) {
    e.preventDefault();
    const token = await checkJWT();
    await deleteNovelChapter(novelUrl, fileName, token.value);
    await navigateHomepage();
  };

  if (isAuthorized) {
    return (
      <div>
        <Link href={`/novel/edit/${novelUrl}/${fileName}`}>Edit</Link>
        <a onClick={handleDelete}>Delete chapter</a>
        <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>{text[0]}</div>
        {text.slice(1).map((e, i) => {
          return <div key={i}>{e}</div>;
        })}
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>{text[0]}</div>
      {text.slice(1).map((e, i) => {
        return <div key={i}>{e}</div>;
      })}
    </div>
  );
}
