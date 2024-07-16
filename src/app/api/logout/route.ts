import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const logoutUrl = `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?p=${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;
  console.log("Logout URL: ", logoutUrl);
  return NextResponse.redirect(logoutUrl);
}
