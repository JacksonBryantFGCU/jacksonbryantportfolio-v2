import { useState } from "react";
import { pb } from "../lib/pocketbase";
import toast from "react-hot-toast";

export function usePocketbaseLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await pb.admins.authWithPassword(email, password);
      toast.success("PocketBase admin login successful");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "PocketBase login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    pb.authStore.clear();
    toast("PocketBase admin logged out");
  };

  const isLoggedIn = pb.authStore.isValid && !!pb.authStore.token;

  return {
    login,
    logout,
    isLoggedIn,
    loading,
    adminEmail: pb.authStore.model?.email || null,
  };
}