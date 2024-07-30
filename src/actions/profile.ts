"use server";

import environment from "@lib/environment";
import { auth } from "@service/auth";

export async function getProfile() {
  const session = await auth();
  if (session) {
    // const url = `${environment.BACKEND_API_URL}/profiles/me`;
    const url = "https://dummyjson.com/users/1";
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();
    console.debug(data);
    return JSON.stringify(data, null, 2);
  }
  throw new Error("Authentication error");
}
