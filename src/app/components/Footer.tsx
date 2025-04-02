// components/Footer.tsx
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__col}>
          <div className={styles.footer__logo}>
            <div>S</div>
            <span>sanmsets</span>
          </div>
          <p>Your premium nail salon experience</p>
          <div className={styles.footer__socials}>
            <Link href="#"><i className="ri-facebook-fill"></i></Link>
            <Link href="#"><i className="ri-instagram-line"></i></Link>
            <Link href="#"><i className="ri-twitter-fill"></i></Link>
          </div>
        </div>

        <div className={styles.footer__col}>
          <h4>Quick Links</h4>
          <ul className={styles.footer__links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/pricelist">Services</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div className={styles.footer__col}>
          <h4>Contact Us</h4>
          <ul className={styles.footer__links}>
            <li>123 Nail Street</li>
            <li>Beauty City, BC 10001</li>
            <li>Phone: (123) 456-7890</li>
            <li>Email: hello@sanmsets.com</li>
          </ul>
        </div>
      </div>

      <div className={styles.footer__bar}>
        Copyright © {new Date().getFullYear()} sanmsets. All rights reserved.
      </div>
    </footer>
  );
}