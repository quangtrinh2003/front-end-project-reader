"use server";

import axios from "axios";

export default async function getNovels() {
  return await axios
    .get("http://localhost:3001/api/v1/novels")
    .then((response) => response.data);
}
