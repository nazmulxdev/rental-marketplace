"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="btn btn-secondary w-full flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  );
}
