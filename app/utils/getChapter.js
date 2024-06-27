"use server";

import axios from "axios";

export default async function getChapter(novelUrl, fileName) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_URL}/api/v1/novels/${novelUrl}/${fileName}`)
    .then((response) => response.data);
}
