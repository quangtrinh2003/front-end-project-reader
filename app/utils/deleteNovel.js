"use server";

import axios from "axios";

export default async function deleteNovel(novelUrl, token) {
  await axios.delete(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/novels/${novelUrl}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
