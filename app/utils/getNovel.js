"use server";

import axios from "axios";

export default async function getNovel(novelUrl) {
  return await axios
    .get(`${process.env.URL}/api/v1/novels/${novelUrl}`)
    .then((response) => response.data);
}
