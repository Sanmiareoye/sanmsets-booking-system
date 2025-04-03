// components/BookNowLink.tsx
import Link from 'next/link';
import React from 'react';
import styles from '../styles/HeroSection.module.css';

const BookNowLink = ({params, href} : {params : string, href : string}) => {
  return (
    <Link href={href} className={styles.btn}>
      {params}
    </Link>
  );
};

export default BookNowLink;