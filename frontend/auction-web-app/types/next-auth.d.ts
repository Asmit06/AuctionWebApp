import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        username: string
    } & DefaultSession['user']
  }

  interface Profile {
    username:string
  }
}

declare module "next-auth/jwt" {
    interface JWT {
        username: string
        access_token?: string
    }
}
