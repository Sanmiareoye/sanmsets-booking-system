// components/Footer.tsx
import Link from 'next/link';
import { 
  RiFacebookFill, 
  RiInstagramLine, 
  RiTwitterFill,
  RiMapPin2Line,
  RiMailLine
} from 'react-icons/ri';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__col}>
          <div className={styles.footer__logo}>
            <div>S</div>
            <span>sanmsets</span>
          </div>
          <p className={styles.footer__description}>
            Your premium nail salon experience
          </p>
          <div className={styles.footer__socials}>
            <Link 
              href="https://www.facebook.com/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <RiFacebookFill className={styles.social__icon} />
            </Link>
            <Link 
              href="https://www.instagram.com/sanmsets/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <RiInstagramLine className={styles.social__icon} />
            </Link>
            <Link 
              href="https://twitter.com/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <RiTwitterFill className={styles.social__icon} />
            </Link>
          </div>
        </div>

        <div className={styles.footer__col}>
          <h4 className={styles.footer__heading}>Quick Links</h4>
          <ul className={styles.footer__links}>
            <li>
              <Link href="/" className={styles.footer__link}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={styles.footer__link}>About</Link>
            </li>
            <li>
              <Link href="/pricelist" className={styles.footer__link}>Services</Link>
            </li>
            <li>
              <Link href="/terms" className={styles.footer__link}>Terms</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer__col}>
          <h4 className={styles.footer__heading}>Contact Us</h4>
          <ul className={styles.footer__links}>
            <li className={styles.contact__item}>
              <RiMapPin2Line className={styles.contact__icon} />
              Dublin, Ireland, D15
            </li>
            <li className={styles.contact__item}>
              <Link 
                href="https://www.instagram.com/sanmsets/" 
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiInstagramLine className={styles.contact__icon} />
                Instagram: @sanmsets
              </Link>
            </li>
            <li className={styles.contact__item}>
              <Link 
                href="mailto:sanmsets@gmail.com" 
                className={styles.footer__link}
              >
                <RiMailLine className={styles.contact__icon} />
                sanmsets@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footer__bar}>
        Copyright © {currentYear} sanmsets. All rights reserved.
      </div>
    </footer>
  );
}