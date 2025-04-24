import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./pricelist.module.css";
import ScrollRevealWrapper from "../components/ScrollRevealWrapper";

type PricingCardProps = {
  image: string;
  alt: string;
  title: string;
  description?: string;
  note?: string;
  price: string;
  priceNote?: string;
};

const PricingCard = ({
  image,
  alt,
  title,
  description,
  note,
  price,
  priceNote,
}: PricingCardProps) => (
  <div className={styles.room__card}>
    <Image
      src={`/images/${image}`}
      alt={alt}
      width={400}
      height={300}
      className={styles.room__image}
    />
    <div className={styles.room__card__details}>
      <div>
        <h4>{title}</h4>
        {description && <p>{description}</p>}
        {note && (
          <p
            className={styles.note}
            dangerouslySetInnerHTML={{ __html: note }}
          />
        )}
      </div>
      <h3>
        {price}
        {priceNote && <span>{priceNote}</span>}
      </h3>
    </div>
  </div>
);

const PricelistPage = () => {
  const pricingData = [
    {
      image: "price-list-1.jpg",
      alt: "Plain Set",
      title: "Plain Set",
      description: "Simple and cute, acrylic only set.",
      price: "€40.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-2.jpg",
      alt: "French Classic",
      title: "French Classic/ Painted One Colour Set",
      description: "One color French tip set or one full colour painted set.",
      price: "€45.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-3.jpg",
      alt: "Baby Design Set",
      title: "Baby Design Set",
      description: "Up to 2 designs, e.g., chrome + French or 3D + French.",
      price: "€50.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-4.jpg",
      alt: "Medium Set",
      title: "Medium Set",
      description: "Up to 3 designs, e.g., chrome + French + 3D.",
      note: "Side Note: Reference picture includes airbrush which is + €5, please check T&C's.",
      price: "€55.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-5.jpg",
      alt: "Chic Set",
      title: "Chic Set",
      description: "Up to 4 designs, e.g., chrome + French + 3D + Small Gems.",
      price: "€60.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-6.jpg",
      alt: "Extravaganza Set",
      title: "Extravaganza Set",
      description: "Freestyle/6+ designs includes 3 large gems.",
      price: "€65.50",
      priceNote: " regular length",
    },
    {
      image: "price-list-7.jpg",
      alt: "Gems",
      title: "Gems",
      price: "€4",
      priceNote: " per large gem",
    },
    {
      image: "price-list-8.jpg",
      alt: "Length Add-ons",
      title: "Long / Extra Long / XXL",
      price: "+ €5 / + €8 / + €10",
    },
    {
      image: "price-list-9.jpg",
      alt: "Airbrush",
      title: "Airbrush",
      description: "Add airbrush to any set./Colour switch more than 2 times.",
      price: "€5 / €8",
      priceNote: " per set",
    },
  ];

  return (
    <>
      <main className={styles.room__container}>
        <p className={styles.section__subheader}>Sets</p>
        <h2 className={styles.section__header}>Nail Sets</h2>
        <div className={styles.room__grid}>
          {pricingData.map((item, index) => (
            <ScrollRevealWrapper
              key={item.image}
              options={{
                delay: 100, // Base delay
                interval: 200, // Time between each animation
                distance: "30px",
                origin: "bottom",
              }}
            >
              <PricingCard
                key={index}
                image={item.image}
                alt={item.alt || item.title}
                title={item.title}
                description={item.description}
                note={item.note}
                price={item.price}
                priceNote={item.priceNote}
              />
            </ScrollRevealWrapper>
          ))}
          <div className={styles.room__card}>
            <div className={styles.room__card__details}>
              <ScrollRevealWrapper
                options={{
                  delay: 100, // Base delay
                  interval: 200, // Time between each animation
                  distance: "30px",
                  origin: "bottom",
                }}
              >
                <div>
                  <h4>Soak Off</h4>
                  <p>Safe removal of artifical nails.</p>
                </div>
              </ScrollRevealWrapper>
              <h3>€10</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PricelistPage;
