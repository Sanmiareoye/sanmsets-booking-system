"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function UserAccountNavbar({
  closeMenu,
}: {
  closeMenu?: () => void;
}) {
  const handleSignOut = () => {
    if (closeMenu) closeMenu();
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/login`,
    });
  };

  return (
    <>
      <Link href="/bookings" onClick={closeMenu}>
        Bookings
      </Link>
      <Button className="bg-black hover:bg-gray-800" onClick={handleSignOut}>
        Sign Out
      </Button>
    </>
  );
}
