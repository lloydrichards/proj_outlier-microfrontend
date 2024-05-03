"use server";
import { signIn as naSignIn, signOut as naSignOut } from "@/server/auth";

export async function signIn() {
  await naSignIn();
}

export async function signOut() {
  await naSignOut();
}
