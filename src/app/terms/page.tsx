// app/terms/page.tsx
import { RiCloseCircleLine, RiMapPinLine, RiWalletLine } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollRevealWrapper from "../components/ScrollRevealWrapper";
import styles from "./terms.module.css";

export default function TermsPage() {
  const terms = [
    {
      icon: <RiCloseCircleLine size={40} />,
      title: "Refills",
      description:
        "I don't work on other people's work, only my work. I don't refill sets more than 4 weeks old. Refills are charged the same as regular length sets.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Deposit",
      description:
        "A deposit of €10 is required to secure your booking. Please ensure to check the confirmation email on how to send this.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Rescheduling",
      description:
        "You have to reschedule before 72 hours of your appointment. If it is within 72 hours, you will have to book a fresh appointment and your deposit will be lost.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Late Fees",
      description:
        "If you are up to 15 minutes late, a late fee of €10 will be added to your bill. If you are up to 30 minutes late, the appointment will then be cancelled.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Out of Hours / Emergency Slots",
      description:
        "If you need an appointment outside of the times available or the hours 12pm - 6pm, an extra charge of €15 applies. Contact me at sanmsets@gmail.com to arrange this appointment.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Same Day",
      description:
        "If you book an appointment within 24hrs, an  extra  charge  of  €10 applies.",
    },
    {
      icon: <RiWalletLine size={40} />,
      title: "Payment Options",
      description: "We take payment through bank transfer and cash.",
    },
    {
      icon: <RiMapPinLine size={40} />,
      title: "Location",
      description:
        "Tyrellstown Area Blanchardstown. Please request full address within 24 hours of your appointment.",
    },
  ];

  return (
    <>
      <section className={styles.section__container}>
        <ScrollRevealWrapper options={{ delay: 0 }}>
          <p className={styles.section__subheader}>FACILITIES</p>
          <h2 className={styles.section__header}>T & C&apos;s</h2>
        </ScrollRevealWrapper>

        <div className={styles.feature__grid}>
          {terms.map((term, index) => (
            <ScrollRevealWrapper
              key={index}
              options={{
                delay: index * 100,
                distance: "20px",
                origin: "bottom",
              }}
            >
              <div className={styles.feature__card}>
                <span className={styles.icon__container}>{term.icon}</span>
                <h4>{term.title}</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: term.description.replace(
                      /€(\d+)/g,
                      "<u><strong>€$1</strong></u>"
                    ),
                  }}
                />
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>
    </>
  );
}
