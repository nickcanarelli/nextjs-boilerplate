"use client";

import { Button } from "@components/core";
import { ENV_URLS } from "@lib/constants";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Logout = () => {
  return (
    <Button
      group="normal"
      variant="outlined"
      size="sm"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};

export const Admin = () => {
  const router = useRouter();

  return (
    <Button
      group="normal"
      variant="primary"
      size="sm"
      onClick={() => router.push(ENV_URLS.admin)}
    >
      Admin
    </Button>
  );
};
