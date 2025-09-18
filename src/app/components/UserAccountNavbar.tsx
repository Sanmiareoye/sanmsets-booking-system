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
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Link href="/bookings" onClick={closeMenu}>
        Bookings
      </Link>
      <Button className="bg-gray-600 hover:bg-gray-700" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
