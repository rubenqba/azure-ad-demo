import NextAuth from "next-auth";
import AzureADB2CProvider, { AzureB2CProfile } from "next-auth/providers/azure-ad-b2c";
import { OAuthUserConfig } from "next-auth/providers/oauth";

const azureOpts: OAuthUserConfig<AzureB2CProfile> & {
  primaryUserFlow?: string;
  tenantId?: string;
} = {
  name: "DARDEUS",
  tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
  clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
  clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
  primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW!,
  profileUrl: "https://graph.microsoft.com/oidc/userinfo",
  profile: (profile, tokens) => {
    console.log("THE PROFILE", profile);

    return {
      id: profile.oid,
      name: profile.name,
      country: profile.country,
      email: profile.emails.length > 0 ? profile.emails[0] : null,
    };
  },
  authorization: {
    params: {
      scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.WEB_API_NAME}/Read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.WEB_API_NAME}/Write openid profile email`,
    },
  },
};
console.log(JSON.stringify(azureOpts, null, 2))
const handler = NextAuth({
  providers: [
    AzureADB2CProvider(azureOpts),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      return session
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
