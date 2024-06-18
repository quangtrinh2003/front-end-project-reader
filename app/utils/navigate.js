"use server";
import { redirect } from "next/navigation";

export async function navigateLogin() {
  redirect("/login");
}

export async function navigateRegister() {
  redirect("/register");
}

export async function navigateUpload() {
  redirect("/upload");
}

export async function navigateHomepage() {
  redirect("/");
}
