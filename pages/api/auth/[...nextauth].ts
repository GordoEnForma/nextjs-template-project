import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'prisma/db'

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],


  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  debug: true,
  adapter: PrismaAdapter(prisma),

  callbacks: {

    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return Promise.resolve(session)
    },
  },
})