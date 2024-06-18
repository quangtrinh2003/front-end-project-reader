"use client";

import { useEffect, useState } from "react";
import getChapter from "@/app/utils/getChapter";
import Link from "next/link";
import checkJWT from "@/app/utils/checkJWT";
import checkAuthorized from "@/app/utils/checkAuthorized";

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

  if (isAuthorized) {
    return (
      <div>
        <Link href={`/novel/edit/${novelUrl}/${fileName}`}>Edit</Link>
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
