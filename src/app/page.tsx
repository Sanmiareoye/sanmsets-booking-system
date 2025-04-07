// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/HeroSection.module.css";
import Button from "./components/Button";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className={styles.header}>
        {/* Background image animation handled in CSS */}
        <div className={styles.section__container}>
          <p className={styles.section__subheader}>Girl....</p>
          <h1>
            It&apos;s about time
            <br />
            For a Fresh Set!
          </h1>
          <div className={styles.buttonContainer}>
            <Button params="Take A Tour" href="/about" />
            <Button params="Check Availability" href="/calendar" />
          </div>
        </div>
      </header>

      {/* You can add other sections of your home page below */}
    </>
  );
}
