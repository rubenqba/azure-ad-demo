import { JWT } from "next-auth/jwt";
import { Config } from "@lib/environment";

// process WWW-Authenticate header response and return a dictionary
export async function parseWWWAuthenticateHeader(
  header?: string | null
): Promise<Record<string, string>> {
  if (header) {
    const result: Record<string, string> = {};
    const parts = header.substring(7).split(", ");
    for (const part of parts) {
      const [key, value] = part.split("=");
      result[key] = value.replaceAll('"', "");
    }
    return Promise.resolve(result);
  }
  return Promise.resolve({});
}

export async function refreshAccessToken(token: JWT, config: Config) {
  console.error(`Refresh access token...`);
  try {
    const url = `https://${config.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${config.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${config.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/token`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        `grant_type=refresh_token` +
        `&client_secret=${config.AZURE_AD_B2C_CLIENT_SECRET}` +
        `&refresh_token=${token.refreshToken}` +
        `&client_id=${config.AZURE_AD_B2C_CLIENT_ID}`,
    });
    if (!req.ok) {
      throw new Error(`Failed to refresh access token: ${req.statusText}`);
    }
    const data = await req.json();
    console.debug("Refresh data: ", data);
    return {
      ...token,
      accessToken: data.access_token,
      expires: data.expires_on - 1,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
