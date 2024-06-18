"use server";

import { cookies } from "next/headers";

export default async function deleteJWT() {
  cookies().delete("jwt");
}
