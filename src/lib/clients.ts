import { auth } from "@service/auth";
import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { Client } from "@model/users";

export async function getClients() {
  try {
    const session = await auth();
    if (session) {
      const url = `${environment.BACKEND_API_URL}/clients`;
      console.debug(session);
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/json",
        },
      });
      if (res.ok) {
        const data: Client[] = await res.json();
        console.debug(data);
        return { data, error: null };
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
    return { error, data: null };
  }
}
