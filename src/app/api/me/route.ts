import { auth } from "@service/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  try {
    const accessToken = session?.accessToken;
    if (accessToken) {
      const res = await fetch("http://host.local:8080/protected_flow/campaign1", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: "application/json"
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await res.json();
      console.log("data:", data);
      return NextResponse.json(data);
    }
    throw new Error("No access token found");
  } catch (error: Error | unknown) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
