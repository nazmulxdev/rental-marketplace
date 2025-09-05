import { getCollection } from "@/lib/db.connect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        //Credentials provider
        CredentialsProvider({
  name: "Credentials",
  credentials: { 
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
   },
  async authorize(credentials) {
    const { usersCollection } = await getCollection()

    //Check if the user not found or not registered
    const user = await usersCollection.findOne({ email: credentials.email })
    if (!user) throw new Error("No user found")

    //Check valididty of password
    const isValid = await bcrypt.compare(credentials.password, user.password)
    if (!isValid) throw new Error("Invalid password")

    return { id: user._id.toString(), name: user.name, email: user.email }
  },
})
    ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user?.email) return false;
        const { usersCollection } = await getCollection();
        let existing = await usersCollection.findOne({ email: user.email });
        if (!existing) {
          const insert = await usersCollection.insertOne({
            name: user.name || '',
            email: user.email,
            password: null,
            provider: account?.provider || 'unknown',
            role: 'user',
            createdAt: new Date()
          });
          existing = { _id: insert.insertedId, email: user.email, name: user.name };
        }
        // Overwrite runtime user.id with DB _id so downstream token.sub can be normalized in jwt callback
        user.id = existing._id.toString();
        return true;
      } catch (e) {
        console.error('signIn callback error', e);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (token?.email) {
          const { usersCollection } = await getCollection();
            const existing = await usersCollection.findOne({ email: token.email });
            if (existing) {
              token.sub = existing._id.toString();
            }
        }
      } catch (e) {
        console.error('jwt callback error', e);
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user = { ...session.user, id: token.sub };
      }
      return session;
    }
  },
    
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}