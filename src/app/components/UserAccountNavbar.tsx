"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import React from "react";

export default function UserAccountNavbar() {
  return (
    <div>
      <Link href="/bookings">Bookings</Link>
      <Button
        className={`${styles.sign__out__btn} hover:bg-[var(--secondary-color)]`}
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
}
