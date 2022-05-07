import NextAuth from "next-auth";
import Discord, { DiscordProfile } from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    Discord<DiscordProfile>({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: `identify guilds`,
        },
      },
      profile: (profile) => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "webp";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return profile;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      if (account && account.access_token && profile) {
        token.accessToken = account.access_token;
        token.profile = profile as DiscordProfile;
      }

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.profile as DiscordProfile;
      return session;
    },
  },
});
