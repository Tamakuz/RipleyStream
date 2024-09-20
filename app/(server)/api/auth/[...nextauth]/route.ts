// imports
import NextAuth from "next-auth"
import User from "@/app/(server)/models/user.model"
import CryptoJS from "crypto-js"

// importing providers
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { dbConnection } from "@/app/(server)/db/dbConnection"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      await dbConnection()
      try {
        if (user && account) {
          const existingUser = await User.findOne({ email: user.email, provider: account.provider })
          if (existingUser) {
            if (!existingUser.image) {
              existingUser.image = user.image
              await existingUser.save()
            }
            return true
          }

          const image = profile?.picture || user.image || 'default_image_url'
          await User.create({
            email: user.email,
            provider: account.provider,
            tokenApi: CryptoJS.lib.WordArray.random(32).toString(),
            image: image
          })
        }
      } catch (error) {
        console.log(error)
        return "/"
      }
      return true
    },
    async session({ session }: { session: any }): Promise<any> {
      await dbConnection()
      const existingUser = await User.findOne({ email: session?.user?.email })
      if (existingUser && session && session.user) {
        session.user.provider = existingUser.provider;
        session.user.tokenApi = existingUser.tokenApi
      }

      return session;
    },
  }
})

export { handler as GET, handler as POST }