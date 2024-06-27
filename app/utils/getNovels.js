"use server";

import axios from "axios";

export default async function getNovels() {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_URL}/api/v1/novels`)
    .then((response) => response.data);
}
