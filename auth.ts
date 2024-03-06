import { LoginResponse, logIn, logOut } from "@/app/api/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PCConnectionInstance } from "./app/api";
import { AxiosError } from "axios";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }
          const data: any = await logIn(credentials);

          if (!data) {
            throw new Error("Invalid credentials");
          }

          PCConnectionInstance.interceptors.request.use(
            (config) => {
              if (data.token) {
                config.headers.Authorization = `Bearer ${data.token}`;
              }
              return config;
            },
            (error) => {
              return Promise.reject(error as AxiosError);
            }
          );

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            sex: data.user.sex,
            address: data.user.address,
            birthday: data.user.birthday,
            role: data.user.role,
            accessToken: data.token,
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
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
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
