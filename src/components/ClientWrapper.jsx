// ClientWrapper.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import ThemeProvider from "../context/ThemeProvider";

export default function ClientWrapper({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
