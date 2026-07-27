import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mocking user verification. We will hook this up to Prisma later.
        if (credentials?.email === "admin@jagin.ai" && credentials?.password === "admin") {
          return {
            id: "00000000-0000-0000-0000-000000000000",
            name: "Admin User",
            email: "admin@jagin.ai",
            // We can attach custom properties here
            orgId: "11111111-1111-1111-1111-111111111111",
          };
        }
        return null;
      }
    })
  ],
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
});
