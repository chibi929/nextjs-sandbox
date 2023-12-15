import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/learn/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('CHIBI(authorized)')
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/learn/dashboard')
      if (isOnDashboard) {
        return isLoggedIn
      }
      if (isLoggedIn) {
        return Response.redirect(new URL('/learn/dashboard', nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
