import NextAuth from "next-auth";
import { DiscordProfile } from "next-auth/providers/discord";

declare module "next-auth" {
  interface Session {
    user: DiscordProfile;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    profile: DiscordProfile;
  }
}
