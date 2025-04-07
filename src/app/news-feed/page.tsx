"use client";

import { useState } from "react";
import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import styles from "./NewsFeed.module.css";
import ScrollRevealWrapper from "../components/ScrollRevealWrapper";

type NewsCardProps = {
  id: number;
  image?: string;
  date: string;
  author: string;
  title: string;
  content: string;
};

const NewsCard = ({ image, date, author, title, content }: NewsCardProps) => (
  <div className={styles.news__card}>
    {image && (
      <Image
        src={`/images/${image}`}
        alt={title}
        width={400}
        height={300}
        className={styles.news__image}
      />
    )}
    <div className={styles.news__card__title}>
      <p>{date}</p>
      <p>By {author}</p>
    </div>
    <h4>{title}</h4>
    <p>{content}</p>
  </div>
);

const NewsFeedPage = () => {
  const allNewsData = [
    {
      id: 1,
      image: "news-2.1.jpg",
      date: "25th March 2024",
      author: "Precious",
      title: "You're a hidden gem",
      content: "So crazy that I just found you, my forever nailtech.",
    },
    {
      id: 2,
      image: "news-1.2.jpg",
      date: "15th June 2022",
      author: "Anonymous",
      title: "My safe space",
      content:
        "Thanks again for my nails today hun xx It's like a safe space getting my nails done with you lol.",
    },
    {
      id: 3,
      image: "room-3.1.jpg",
      date: "08th August 2023",
      author: "Lilly",
      title: "Ate Down",
      content:
        "People haven't stopped complimenting my nails, I love them so much, see you in 3 weeks! XD",
    },
    {
      id: 4,
      date: "09th April 2023",
      author: "Damoye",
      title: "Retention on 10!",
      content: "6 weeks and I still got all 10 nails.",
    },
    // Add more news items as needed
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allNewsData.length / itemsPerPage);

  const paginatedNews = allNewsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <>
      <main className={styles.section__container}>
        <div className={styles.news__header}>
          <div>
            <p className={styles.section__subheader}>BLOG</p>
            <h2 className={styles.section__header}>News Feeds</h2>
          </div>
          <div className={styles.section__nav}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={styles.navButton}
              aria-label="Previous news"
            >
              <RiArrowLeftLine />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={styles.navButton}
              aria-label="Next news"
            >
              <RiArrowRightLine />
            </button>
          </div>
        </div>

        <div className={styles.news__grid}>
          {paginatedNews.map((item) => (
            <ScrollRevealWrapper
              key={item.id}
              options={{
                delay: 100,
                interval: 200,
                distance: "30px",
                origin: "bottom",
              }}
            >
              <NewsCard
                id={item.id}
                image={item.image}
                date={item.date}
                author={item.author}
                title={item.title}
                content={item.content}
              />
            </ScrollRevealWrapper>
          ))}
        </div>

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`${styles.pageButton} ${
                currentPage === index ? styles.active : ""
              }`}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default NewsFeedPage;
