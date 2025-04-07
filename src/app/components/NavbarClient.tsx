// NavbarClient.tsx (client component)
"use client";

import Link from "next/link";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import UserAccountNavbar from "./UserAccountNavbar";
import BookNowLink from "./Button";
import { Button } from "@/components/ui/button";

export default function NavbarClient({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__bar}>
        <div className={styles.nav__header}>
          <Link href="/" className={`${styles.logo} ${styles.nav__logo}`}>
            <div>S</div>
            <span>sanmsets</span>
          </Link>
          <button
            className={styles.nav__menu__btn}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
        <ul className={`${styles.nav__links} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/pricelist">Pricelist</Link>
          </li>
          <li>
            <Link href="/terms">T&C</Link>
          </li>
          {session?.user ? (
            <li>
              <Link href="/calendar">Book Now</Link>
            </li>
          ) : (
            <Link href="/calendar">Check Availability</Link>
          )}
          <li>
            <Link href="/news-feed">News Feed</Link>
          </li>
          {session?.user ? (
            <li>
              <UserAccountNavbar />
            </li>
          ) : (
            <Link href="/login">
              <Button className="bg-[var(--secondary-color)] hover:bg-[var(--text-light)]">
                Sign In
              </Button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
