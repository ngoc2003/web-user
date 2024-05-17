import { logIn, logInWithGoogle, logOut } from "@/app/api/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PCConnectionInstance, setAuthorizationHeader } from "./app/api";
import { AxiosError } from "axios";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid");
          }
          const data: any = await logIn(credentials);

          if (!data) {
            throw new Error("No user found");
          }

          setAuthorizationHeader(data.token);

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            sex: data.user.sex,
            address: data.user.address,
            birthday: data.user.birthday,
            role: data.user.role,
            accessToken: data.token,
            image: data.user.image,
          };
        } catch (err: any) {
          console.log(err);
          throw new Error(err.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    signOut: async () => {
      await logOut();
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, account, session }) {
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      if (trigger === "signIn" && account?.provider === "google") {
        const { providerAccountId, access_token, expires_at } = account;
        const { name, email, picture } = token;

        try {
          const data = await logInWithGoogle({
            providerAccountId,
            access_token,
            expires_at,
            name: name || "",
            email: email || "",
            image: picture || "",
          });

          setAuthorizationHeader(data.token);

          token = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            sex: data.user.sex,
            address: data.user.address,
            birthday: data.user.birthday,
            role: data.user.role,
            accessToken: data.token,
            image: data.user.image,
          };

          return { ...user, ...token, ...session };
        } catch (err: any) {
          console.log("Error during Google login:", err.message);
          throw new Error("Google login failed");
        }
      }

      return { ...token, ...user, ...session };
    },

    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = +token.sub;
      }
      if (token.id && session.user) {
        session.user.id = +token.id;
      }

      if (token.role && session.user) {
        session.user.role = token.role as number;
      }
      if (token.sex && session.user) {
        session.user.sex = token.sex as string;
      }
      if (token.address && session.user) {
        session.user.address = token.address as string;
      }
      if (token.birthday && session.user) {
        session.user.birthday = token.birthday as Date;
      }
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken as string;
      }
      if (token.image && session.user) {
        session.user.image = token.image as string;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
