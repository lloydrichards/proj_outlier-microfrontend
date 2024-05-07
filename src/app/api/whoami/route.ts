import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

export const GET = auth(async ({ auth }) => {
  return NextResponse.json({ user: auth?.user });
});
