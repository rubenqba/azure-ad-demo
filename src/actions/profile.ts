"use server";

import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { auth } from "@service/auth";

export async function getProfile() {
  try {
    const session = await auth();
    if (session) {
      const url = `${environment.BACKEND_API_URL}/profiles/me`;
      console.debug("URL:", url);
      console.debug("Token:", session.accessToken);
      // const url = "https://dummyjson.com/users/1";
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      console.debug(data);
      return JSON.stringify(data, null, 2);
    }
    throw new Error("Authentication error");
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      return JSON.stringify({ error: error.message }, null, 2);
    return JSON.stringify(error, null, 2);
  }
}

export async function deleteCurrentProfile() {
  try {
    const session = await auth();
    if (session) {
      const url = `${environment.BACKEND_API_URL}/profiles/me`;
      console.debug("URL:", url);
      console.debug("Token:", session.accessToken);
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.debug(data);
        return JSON.stringify(data, null, 2);
      }
      const error = await parseWWWAuthenticateHeader(
        res.headers.get("WWW-Authenticate")
      );
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
    throw new Error(`Authentication error: missing token`);
  } catch (error) {
    if (error instanceof Error)
      return JSON.stringify(
        { error: error.message, cause: error.cause },
        null,
        2
      );
    return JSON.stringify(error, null, 2);
  }
}
