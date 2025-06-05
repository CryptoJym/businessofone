"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = !!session?.user;
  const isLoading = status === "loading";
  const user = session?.user;

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/");
  }, [router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    session,
  };
}