"use server";

import axios from "axios";

export default async function checkAuthorized(novelUrl, jwt) {
  try {
    await axios.post(
      `${process.env.URL}/api/v1/novels/${novelUrl}`,
      {},
      { withCredentials: true, headers: { Authorization: `Bearer ${jwt}` } },
    );
    return true;
  } catch (err) {
    return false;
  }
}
