import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import AzureADB2CProvider, {
  AzureB2CProfile,
} from "next-auth/providers/azure-ad-b2c";
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
  profile: (profile, tokens) => {
    console.log("THE PROFILE", profile);

    return {
      id: profile.oid ?? profile.sub,
      displayName: profile.name ?? [profile.given_name, profile.family_name]
        .filter((t) => t && t.length > 0)
        .join(" "),
      givenName: profile.given_name,
      familyName: profile.family_name,
      country: profile.country,
      email: profile.emails?.length > 0 ? profile.emails[0] : null,
      partner: {
        id: profile.extension_PartnerID ?? null,
        name: profile.extension_PartnerName ?? null,
      },
    };
  },
  authorization: {
    params: {
      scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.WEB_API_NAME}/Read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${process.env.WEB_API_NAME}/Write openid profile email`,
    },
  },
};

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [AzureADB2CProvider(azureOpts)],
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (account?.access_token) {
        token.accessToken = account?.access_token;
      }
      if (profile) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: true,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
