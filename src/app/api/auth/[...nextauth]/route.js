import { getCollection } from "@/lib/db.connect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { usersCollection } = await getCollection();

        // Check if the user exists
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) throw new Error("No user found");

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user?.email) return false;
        const { usersCollection } = await getCollection();

        let existing = await usersCollection.findOne({ email: user.email });

        if (!existing) {
          // Save Google user to MongoDB
          const insert = await usersCollection.insertOne({
            email: user.email,
            emailVerified: true,
            roles: ["USER"], // SUPER_ADMIN | ADMIN | MEMBER | USER
            status: "active",
            provider: account.provider,
            profile: {
              name: user.name || "",
              phone: "",
              avatarUrl: user.image || "",
              address: {
                city: "",
                district: "",
                division: "",
                country: "",
                postalCode: "",
              },
            },
            createdAt: new Date(),
            updatedAt: "",
            deletedAt: null,
          });

          existing = {
            _id: insert.insertedId,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } else {
          // Update existing user's profile photo and name on each Google login
          if (account.provider === "google") {
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  "profile.name": user.name || existing.profile.name,
                  "profile.avatarUrl": user.image || existing.profile.avatarUrl,
                  updatedAt: new Date(),
                },
              }
            );
          }
        }

        // Attach MongoDB _id to user object
        user.id = existing._id.toString();
        user.role = existing.roles ? existing.roles[0] : "USER";
        user.image = existing.profile?.avatarUrl || user.image;

        return true;
      } catch (e) {
        console.error("signIn callback error", e);
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
            token.role = existing.roles ? existing.roles[0] : "USER";
            token.image = existing.profile?.avatarUrl || null;
          }
        }
      } catch (e) {
        console.error("jwt callback error", e);
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          role: token.role || "USER",
          image: token.image || null,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
