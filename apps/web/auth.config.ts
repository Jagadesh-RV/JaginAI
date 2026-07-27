import type { NextAuthConfig } from 'next-auth';

export default {
  secret: process.env.AUTH_SECRET,
  session: { 
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [], // Empty array for Edge compatibility. Filled in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.orgId = (user as any).orgId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).orgId = token.orgId;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
