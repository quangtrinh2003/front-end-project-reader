"use server";

import axios from "axios";

export default async function getChapter(novelUrl, fileName) {
  return axios
    .get(`http://localhost:3001/api/v1/novels/${novelUrl}/${fileName}`)
    .then((response) => response.data);
}
