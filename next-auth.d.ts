import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: number;
  role: number;
  sex: string;
  address: string;
  birthday: Date;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser & {
      accessToken: string;
    };
  }
}
