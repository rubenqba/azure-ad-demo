import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import AzureADProvider from "next-auth/providers/azure-ad";

const azureOpts = {
  name: "DARDEUS",
  tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
  clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
  clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
  authorization: { params: { scope: `openid` } },
  // client: {
  //   authority: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}`,
  // },
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
