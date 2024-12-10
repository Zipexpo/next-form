import { NextResponse } from "next/server";

export function checkAuth(req) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "UserID is missing in headers" },
      { status: 400 }
    );
  }
  return userId;
}
