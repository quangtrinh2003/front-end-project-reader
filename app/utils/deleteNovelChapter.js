"use server";

import axios from "axios";

export default async function deleteNovelChapter(novelUrl, fileName, token) {
  await axios.delete(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/novels/${novelUrl}/${fileName}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
