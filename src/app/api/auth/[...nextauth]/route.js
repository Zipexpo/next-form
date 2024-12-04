import dbConnect from "@/lib/mongodb";
import { findOrCreateUser } from "@/lib/user";
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, name } = user;
      // Check if the user exists in your database
      await findOrCreateUser({ email, name });

      return true; // Allow the sign-in to proceed if the user exists
    },

    async session({ session, user }) {
      // Include the username (or any other info you want) in the session
      dbConnect();

      const userData = await User.findOne({ email: session.user.email });
      session.user.name = userData?.name || session.user.name;
      session.user.username = userData?.username || "";
      
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
