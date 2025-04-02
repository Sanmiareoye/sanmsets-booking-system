// components/Navbar.tsx
'use client'; // This is needed for interactivity

import Link from 'next/link';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import styles from '../styles/Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
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
        <ul className={`${styles.nav__links} ${isMenuOpen ? styles.open : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/pricelist">Pricelist</Link></li>
          <li><Link href="/terms">T&C</Link></li>
          <li><Link href="/calendar">Book Now</Link></li>
        </ul>
      </div>
    </nav>
  );
}