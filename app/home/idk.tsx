"use client";
import { Button } from "@components/core";
import React from "react";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <Button group="normal" variant="primary" size="sm" onClick={() => signIn()}>
      Sign In
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      group="destructive"
      variant="primary"
      size="sm"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
};
