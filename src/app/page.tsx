"use client";

import { useEffect } from 'react';
import Head from 'next/head';
import './styles.css'; // Import your global CSS
import { RiMapPinLine, RiWalletLine, RiCloseCircleLine, RiUserLine, RiFunctionLine, RiRecordMailLine, RiMapLine, RiMapPin2Fill, RiClockwiseLine, RiTimeLine, RiInstagramLine } from '@remixicon/react'
import { ClockIcon } from '@mui/x-date-pickers';

declare const ScrollReveal: any;

export default function Home() {
  useEffect(() => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");

    // Toggle navigation menu on button click
    menuBtn?.addEventListener("click", () => {
      navLinks?.classList.toggle("open");
      const isOpen = navLinks?.classList.contains("open");
      menuBtnIcon?.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    // Close navigation menu on link click
    navLinks?.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon?.setAttribute("class", "ri-menu-line");
    });

    // Initialize ScrollReveal animations
    if (typeof ScrollReveal !== 'undefined') {
      const scrollRevealOption = {
        distance: "50px",
        origin: "bottom",
        duration: 1000,
      };

      ScrollReveal().reveal(".header__container .section__subheader", { ...scrollRevealOption });
      ScrollReveal().reveal(".header__container h1", { ...scrollRevealOption, delay: 500 });
      ScrollReveal().reveal(".header__container .btn", { ...scrollRevealOption, delay: 1000 });
      ScrollReveal().reveal(".room__card", { ...scrollRevealOption, interval: 500 });
      ScrollReveal().reveal(".feature__card", { ...scrollRevealOption, interval: 500 });
      ScrollReveal().reveal(".news__card", { ...scrollRevealOption, interval: 500 });
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>sanmsets | by Sanmi</title>
      </Head>
      <div>
        <nav>
          <div className="nav__bar">
            <div className="nav__header">
              <div className="logo nav__logo">
                <div>S</div>
                <span>sanmsets</span>
              </div>
              <div className="nav__menu__btn" id="menu-btn">
                <i className="ri-menu-line"></i>
              </div>
            </div>
            <ul className="nav__links" id="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#room">Pricelist</a></li>
              <li><a href="#feature">T&amp;C</a></li>
              <li><a href="https://www.sanmsets-booking.com/calendar">Book Now</a></li>
            </ul>
          </div>
        </nav>
    
        <header className="header" id="home">
          <div className="section__container header__container">
            <p className="section__subheader">Girl....</p>
            <h1>It&apos;s about time<br />For a Fresh Set!</h1>
            <a href="#about" className="btn">Take A Tour</a>
          </div>
        </header>
    
        <section className="booking">
          <div className="section__container booking__container">
            <a href="https://www.sanmsets-booking.com/calendar" className="btn">Check Availability</a>
          </div>
        </section>
    
        <section className="about" id="about">
          <div className="section__container about__container">
            <div className="about__grid">
              <div className="about__image">
                <img src="/assets/about-1.jpg" alt="about" />
              </div>
              <div className="about__card">
                <span><i className="ri-user-line"></i></span>
                <h4>Strong Team of 1</h4>
                <p>A place where clients are highly valued!</p>
              </div>
              <div className="about__image">
                <img src="/assets/about-2.jpg" alt="about" />
              </div>
              <div className="about__card">
                <span><i className="ri-calendar-check-line"></i></span>
                <h4>Luxury Nails</h4>
                <p>There&apos;s nothing that can&apos;t be done at sanmsets.</p>
              </div>
            </div>
            <div className="about__content">
              <p className="section__subheader">ABOUT US</p>
              <h2 className="section__header">Discover Our Underground</h2>
              <p className="section__description">
                Welcome to Sanmsets, where nail artistry and passion have flourished since 2019. Our journey from a humble start to generating over 10,000 euros in revenue speaks volumes about our commitment to excellence. Experience the extraordinary as we blend innovation with elegance to create stunning nail designs that reflect both sophistication and style. Discover the artistry that has rapidly grown and transformed, offering you a touch of luxury with every appointment.
              </p>
              <a href="https://www.sanmsets-booking.com/calendar" className="btn">Book Now</a>
            </div>
          </div>
        </section>
    
        <section className="room__container" id="room">
          <p className="section__subheader">Sets</p>
          <h2 className="section__header">Nail Sets</h2>
          <div className="room__grid">
            <div className="room__card">
              <img src="/assets/price-list-1.jpg" alt="Plain Set" />
              <div className="room__card__details">
                <div>
                  <h4>Plain Set</h4>
                  <p>Simple and cute, one color nail set.</p>
                </div>
                <h3>€35<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-2.jpg" alt="French Classic" />
              <div className="room__card__details">
                <div>
                  <h4>French Classic</h4>
                  <p>One color French tip set.</p>
                </div>
                <h3>€40<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-3.jpg" alt="Baby Design Set" />
              <div className="room__card__details">
                <div>
                  <h4>Baby Design Set</h4>
                  <p>Up to 2 designs, e.g., chrome + French or 3D + French.</p>
                </div>
                <h3>€45<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-4.jpg" alt="Medium Set" />
              <div className="room__card__details">
                <div>
                  <h4>Medium Set</h4>
                  <p>Up to 3 designs, e.g., chrome + French + 3D.<br /><br />Side Note: Reference picture includes airbrush which is + €5, please check T&amp;C&apos;s.</p>
                </div>
                <h3>€50<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-5.jpg" alt="Chic Set" />
              <div className="room__card__details">
                <div>
                  <h4>Chic Set</h4>
                  <p>Up to 4 designs, e.g., chrome + French + 3D + Small Gems.</p>
                </div>
                <h3>€55<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-6.jpg" alt="Extravaganza Set" />
              <div className="room__card__details">
                <div>
                  <h4>Extravaganza Set</h4>
                  <p>Freestyle/6+ designs includes 3 large gems.</p>
                </div>
                <h3>€65<span> regular length</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-7.jpg" alt="Gems" />
              <div className="room__card__details">
                <div>
                  <h4>Gems</h4>
                </div>
                <h3>€4<span> per large gem</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-8.jpg" alt="Length Add-ons" />
              <div className="room__card__details">
                <div>
                  <h4>Long / Extra Long / XXL</h4>
                </div>
                <h3>+ €5 / + €8 / + €10</h3>
              </div>
            </div>
    
            <div className="room__card">
              <img src="/assets/price-list-9.jpg" alt="Airbrush" />
              <div className="room__card__details">
                <div>
                  <h4>Airbrush</h4>
                  <p>Add airbrush to any set/Colour switch more than 2 times.</p>
                </div>
                <h3>€5 / €8<span> per set</span></h3>
              </div>
            </div>
    
            <div className="room__card">
              <div className="room__card__details">
                <div>
                  <h4>Soak Offs</h4>
                </div>
                <h3>€10</h3>
              </div>
            </div>
          </div>
        </section>
    
        <section className="intro">
          <div className="section__container intro__container">
            <div className="intro__content">
              <p className="section__subheader">MMMM...</p>
              <h2 className="section__header">Don&apos;t Think Girl Just Book.</h2>
              <p className="section__description">
                Discover the essence of elegance and creativity with Sanmsets, where we blend sophistication with art. Whether you&apos;re seeking a classic look or a bold, customised design, Sanmsets promises an unforgettable experience. Immerse yourself in our world of exquisite nail artistry, where every detail is crafted to perfection and each visit is a journey of beauty and indulgence.
              </p>
              <a href="https://www.sanmsets-booking.com/calendar" className="btn">Book Now</a>
            </div>
            <div className="intro__video">
              <video src="/assets/luxury.mp4" autoPlay muted loop></video>
            </div>
          </div>
        </section>
    
        <section className="section__container feature__container" id="feature">
          <p className="section__subheader">FACILITIES</p>
          <h2 className="section__header">T &amp; C&apos;s</h2>
          <div className="feature__grid">
            <div className="feature__card">
              <span><i className="ri-close-circle-line"><RiCloseCircleLine size={40}/></i></span>
              <h4>Refills</h4>
              <p>
                I don&apos;t work on other people&apos;s work, only my work. I don&apos;t refill sets more than 4 weeks old. Refills are charged the same as regular length sets.
              </p>
            </div>
            <div className="feature__card">
              <span><i><RiMapPinLine size={40}/></i></span>
              <h4>Location</h4>
              <p>
                Tyrellstown Area Blanchardstown. 
                Please request the full address within 24 hours of your appointment.
              </p>
            </div>
            <div className="feature__card">
              <span><i className="ri-wallet-line"><RiWalletLine size={40}/></i></span>
              <h4>Deposit</h4>
              <p>
                A deposit of €10 is required to secure your booking. Please ensure to check the confirmation email on how to pay this.
              </p>
            </div>
            <div className="feature__card">
              <span><i className="ri-wallet-line"><RiWalletLine size={40}/></i></span>
              <h4>Payment Options</h4>
              <p>
                We accept payment through bank transfer and cash.
              </p>
            </div>
            <div className="feature__card">
              <span><i><RiTimeLine size={40}/></i></span>
              <h4>Late Fees</h4>
              <p>
                If you are up to 15 minutes late, a late fee of <u><strong>€10</strong></u> will be added to your bill.
              </p>
            </div>
            <div className="feature__card">
              <span><i><RiTimeLine size={40}/></i></span>
              <h4>Out of Hours / Emergency Slots</h4>
              <p>
                If you need an appointment outside of the times available or hours 12pm - 6pm, an extra charge of <u><strong>€15</strong></u> applies. Contact me at <u><strong>sanmsets@gmail.com</strong></u> to arrange this appointment.
              </p>
            </div>
          </div>
        </section>
    
        <section className="menu" id="menu">
          <ul className="menu__banner">
            <li>
              <span><RiUserLine size={50}/></span>
              <h4>500</h4>
              <p>Customers Achieved</p>
            </li>
            <li>
              <span><RiFunctionLine size={50}/></span>
              <h4>10K</h4>
              <p>Raised in Revenue</p>
            </li>
          </ul>
        </section>
    
        <section className="section__container news__container" id="news">
          <div className="news__header">
            <div>
              <p className="section__subheader">BLOG</p>
              <h2 className="section__header">News Feeds</h2>
            </div>
            <div className="section__nav">
              <span><i className="ri-arrow-left-line"></i></span>
              <span><i className="ri-arrow-right-line"></i></span>
            </div>
          </div>
          <div className="news__grid">
            <div className="news__card">
              <img src="/assets/news-2.1.jpg" alt="news" />
              <div className="news__card__title">
                <p>25th March 2024</p>
                <p>By Precious</p>
              </div>
              <h4>You&apos;re a hidden gem.</h4>
              <p>
                So crazy that I just found you, my forever nailtech.
              </p>
            </div>
            <div className="news__card">
              <img src="/assets/news-1.2.jpg" alt="news" />
              <div className="news__card__title">
                <p>15th June 2022</p>
                <p>By Anonymous</p>
              </div>
              <h4>My safe space.</h4>
              <p>
                Thanks again for my nails today hun xx It&apos;s like a safe space getting my nails done with you lol.
              </p>
            </div>
            <div className="news__card">
              <img src="/assets/room-3.1.jpg" alt="news" />
              <div className="news__card__title">
                <p>08th August 2023</p>
                <p>By Lilly</p>
              </div>
              <h4>Ate Down.</h4>
              <p>
                People haven&apos;t stopped complimenting my nails, I love them so much, see you in 3 weeks! XD
              </p>
            </div>
            <div className="news__card">
              <div className="news__card__title">
                <p>09th April 2023</p>
                <p>By Damoye</p>
              </div>
              <h4>Retention on 10!</h4>
              <p>
                6 weeks and I still got all 10 nails.
              </p>
            </div>
          </div>
        </section>
    
        <footer className="footer">
          <div className="section__container footer__container">
            <div className="footer__col">
              <div className="logo footer__logo">
                <div>S</div>
                <span>sanmsets</span>
              </div>
              <p className="section__description">
                Experience the extraordinary as we blend innovation with elegance to create stunning nail designs that reflect both sophistication and style. 
                Discover the artistry that has rapidly grown and transformed, offering you a touch of luxury with every appointment. 
              </p>
              <ul className="footer__socials">
                <li>
                  <a href="https://www.instagram.com/sanmsets/?hl=en" target="_blank" rel="noopener noreferrer"><RiInstagramLine/></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/sanmiareoye/" target="_blank" rel="noopener noreferrer"><RiFunctionLine/></a>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h4>Services</h4>
              <div className="footer__links">
                <li><a href="https://www.sanmsets-booking.com/calendar">Online Booking</a></li>
              </div>
            </div>
            <div className="footer__col">
              <h4>Contact Us</h4>
              <div className="footer__links">
                <li>
                  <span><i><RiRecordMailLine size={32}/></i></span>
                  <div>
                    <h5>Email</h5>
                    <p>sanmsets@gmail.com</p>
                  </div>
                </li>
                <li>
                  <span><i><RiMapPin2Fill size={32}/></i></span>
                  <div>
                    <h5>Location</h5>
                    <p>Blanchardstown, Dublin</p>
                  </div>
                </li>
              </div>
            </div>
          </div>
          <div className="footer__bar">
            Copyright © 2024 Web by Sanmi Areoye. All rights reserved.
          </div>
        </footer>
    
        <script src="https://unpkg.com/scrollreveal"></script>
    </div>
  </>
  );
}  