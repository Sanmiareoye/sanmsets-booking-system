// app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { RiUserLine, RiCalendarCheckLine } from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './about.module.css';

const AboutPage = () => {
  const aboutCards = [
    {
      icon: <RiUserLine size={40} color='#f07de6'/>,
      title: "Strong Team of 1",
      description: "A place where clients are highly valued!"
    },
    {
      icon: <RiCalendarCheckLine size={40} color='#f07de6'/>,
      title: "Luxury Nails",
      description: "There's nothing that can't be done at sanmsets."
    }
  ];

  return (
    <>
      <Navbar />
      
      <main className={styles.about}>
        <div className={styles.section__container}>
          <div className={styles.about__grid}>
            <ImageCard 
              src="/images/about-1.jpg" 
              alt="About Sanmsets" 
              priority
            />
            
            <AboutCard 
              icon={aboutCards[0].icon}
              title={aboutCards[0].title}
              description={aboutCards[0].description}
            />
            
            <ImageCard 
              src="/images/about-2.jpg" 
              alt="Luxury Nails" 
            />
            
            <AboutCard 
              icon={aboutCards[1].icon}
              title={aboutCards[1].title}
              description={aboutCards[1].description}
            />
          </div>
          
          <AboutContent />
        </div>
      </main>

      <Footer />
    </>
  );
};

const ImageCard = ({ src, alt, priority = false }: { 
  src: string; 
  alt: string; 
  priority?: boolean 
}) => (
  <div className={styles.about__image}>
    <Image 
      src={src}
      alt={alt}
      width={500}
      height={300}
      className={styles.about__img}
      priority={priority}
    />
  </div>
);

const AboutCard = ({ icon, title, description }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className={styles.about__card}>
      <div className={styles.icon__container}>
        {icon}
      </div>
      <h4 aria-setsize={70}>{title}</h4>
      <p>{description}</p>
    </div>
  );

const AboutContent = () => (
  <div className={styles.about__content}>
    <p className={styles.section__subheader}>ABOUT US</p>
    <h2 className={styles.section__header}>Discover Our Underground</h2>
    <p className={styles.section__description}>
      Welcome to Sanmsets, where nail artistry and passion have flourished since 2019. 
      Our journey from a humble start to generating over 10,000 euros in revenue speaks 
      volumes about our commitment to excellence. Experience the extraordinary as we 
      blend innovation with elegance to create stunning nail designs that reflect both 
      sophistication and style. Discover the artistry that has rapidly grown and 
      transformed, offering you a touch of luxury with every appointment.
    </p>
    <Link href="/calendar" className={styles.btn}>
      Book Now
    </Link>
  </div>
);

export default AboutPage;