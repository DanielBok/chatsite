import { APP_NAME } from "@/constants";
import { makeURL } from "@/lib/api";
import axios from "axios";
import jwtDecode from "jwt-decode";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const CredentialName = `${APP_NAME} Auth API`;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: CredentialName,
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {label: "Username", type: "text", placeholder: "Username"},
        password: {label: "Password", type: "password", placeholder: "Password"}
      },
      async authorize(credentials, _) {
        // Add logic here to look up the user from the credentials supplied
        console.log(makeURL("/account/login"));

        const {data: {token}, status} = await axios.get<{
          token: string
        }>(makeURL("/account/login"), {auth: credentials});
        console.log("Here");

        const {nbt, exp, ...user} = jwtDecode<{ firstName: string, id: number, nbt: number, exp: number }>(token);

        if (status === 200 && user) {
          return {name: user.firstName, id: user.id.toString()};
          // return {id: "1", name: "1", email: "1@a.com"};
        } else {
          return null;
        }
      },
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user};
    },
    async session({session, token}) {
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
};


const handler = NextAuth(authOptions);


export function getDefaultSession(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions);
}

export { handler as GET, handler as POST };
