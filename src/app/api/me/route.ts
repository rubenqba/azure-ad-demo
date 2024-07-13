import { auth } from "@service/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  try {
    const res = await fetch("http://localhost:8080/users/me", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    console.log("data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
