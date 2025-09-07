// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image?: string;
      role: "SUPER_ADMIN" | "ADMIN" | "MEMBER" | "USER";
    };
  }

  interface User {
    id: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN" | "MEMBER" | "USER";
  }
}
