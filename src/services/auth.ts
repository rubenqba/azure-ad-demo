import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import AzureADB2C, { AzureB2CProfile } from "next-auth/providers/azure-ad-b2c";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { PartnerInfo } from "../types/next-auth";
import environment, { Config } from "@lib/environment";
import { refreshAccessToken } from "@lib/utils";

function buildAzureADB2CConfig(config: Config) {
  const opts: OAuthUserConfig<AzureB2CProfile> & {
    primaryUserFlow?: string;
    tenantId?: string;
  } = {
    name: "DARDEUS",
    tenantId: config.AZURE_AD_B2C_TENANT_NAME,
    clientId: config.AZURE_AD_B2C_CLIENT_ID,
    clientSecret: config.AZURE_AD_B2C_CLIENT_SECRET,
    primaryUserFlow: config.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    profile: (profile, tokens) => {
      console.log("THE PROFILE", profile);
      console.debug("THE TOKENS", tokens);

      const partner: PartnerInfo = {
        id: profile.extension_PartnerID ?? null,
        name: profile.extension_PartnerName ?? null,
        subscription: profile.extension_SubscriptionType ?? null,
        roles: profile.extension_PartnerRole?.split(",") ?? [],
      };

      return {
        id: profile.oid ?? profile.sub,
        displayName:
          profile.name ??
          [profile.given_name, profile.family_name]
            .filter((t) => t && t.length > 0)
            .join(" "),
        givenName: profile.given_name,
        familyName: profile.family_name,
        country: profile.country,
        email: profile.emails?.length > 0 ? profile.emails[0] : null,
        partner,
      };
    },
    authorization: {
      params: {
        scope: `${config.AZURE_AD_B2C_AUDIENCE}/Read ${config.AZURE_AD_B2C_AUDIENCE}/Write openid`,
      },
    },
  };
  return opts;
}
const azureOpts = buildAzureADB2CConfig(environment);

export const config: NextAuthOptions = {
  providers: [AzureADB2C(azureOpts)],
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (account && user) {
        token.user = user;
        token.accessToken = account.access_token;
        token.expires = account.expires_at ?? 0;
        token.refreshToken = account.refresh_token;
        return token;
      }

      console.log("JWT expires: ", token.expires);
      if (Date.now() < token.expires * 1000) {
        return token;
      }

      return await refreshAccessToken(token, environment);
    },
    async session({ session, token, user }) {
      const newSession = session;
      if (token.accessToken && session.accessToken !== token.accessToken) {
        newSession.user = token.user;
        newSession.accessToken = token.accessToken;
        newSession.expires = new Date(token.expires * 1000).toISOString();
      }
      // console.debug(newSession);
      return newSession;
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
