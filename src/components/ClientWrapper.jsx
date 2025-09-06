"use client";

import { SessionProvider } from "next-auth/react";
import ThemeProvider from "../context/ThemeProvider";
import Navbar from "./Navbar";

export default function ClientWrapper({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </ThemeProvider>
    </SessionProvider>
  );
}
