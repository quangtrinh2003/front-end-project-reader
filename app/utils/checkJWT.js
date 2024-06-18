"use server";

import { cookies } from "next/headers";
import { navigateHomepage } from "@/app/utils/navigate";

export default async function checkJWT() {
  return cookies().get("jwt");
}
