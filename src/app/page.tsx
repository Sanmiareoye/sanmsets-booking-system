// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/HeroSection.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className={styles.header}>
        {/* Background image animation handled in CSS */}
        <div className={styles.section__container}>
          <p className={styles.section__subheader}>Girl....</p>
          <h1>It's about time<br />For a Fresh Set!</h1>
          <Link href="/about" className={styles.btn}>
            Take A Tour
          </Link>
        </div>
      </header>

      {/* You can add other sections of your home page below */}
    </>
  );
}