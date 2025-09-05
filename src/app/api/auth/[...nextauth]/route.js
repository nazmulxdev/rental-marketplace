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
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}