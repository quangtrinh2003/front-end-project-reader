"use client";

import { useEffect, useState } from "react";
import getNovel from "@/app/utils/getNovel";
import Link from "next/link";
import checkJWT from "@/app/utils/checkJWT";
import checkAuthorized from "@/app/utils/checkAuthorized";

export default function Novel({ params }) {
  const [novelData, setNovelData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { id: novelUrl } = params;

  useEffect(() => {
    (async () => {
      const token = await checkJWT();

      if (token) {
        const status = await checkAuthorized(novelUrl, token.value);
        setIsAuthorized(status);
      }

      const data = await getNovel(novelUrl);
      setNovelData(data.data);
    })();
  }, []);

  if (isAuthorized) {
    return (
      <div>
        <div>
          <Link href={`/novel/${novelUrl}/upload`}>Upload chapter</Link>
        </div>
        <div>
          {novelData.map((e) => {
            return (
              <p key={e.fileName}>
                <Link href={`/novel/${novelUrl}/${e.fileName}`}>
                  {e.chapterName}
                </Link>
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {novelData.map((e) => {
          return (
            <p key={e.fileName}>
              <Link href={`/novel/${novelUrl}/${e.fileName}`}>
                {e.chapterName}
              </Link>
            </p>
          );
        })}
      </div>
    </div>
  );
}
