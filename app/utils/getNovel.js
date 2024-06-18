"use server";

import axios from "axios";

export default async function getNovel(novelUrl) {
  return await axios
    .get(`http://localhost:3001/api/v1/novels/${novelUrl}`)
    .then((response) => response.data);
}
