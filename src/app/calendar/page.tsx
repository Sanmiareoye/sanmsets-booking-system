"use client";

import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import styles from "./calendar.module.css";
import { useSession } from "next-auth/react";
import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const DateCalendar = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.DateCalendar),
  {
    ssr: false,
    loading: () => (
      <div className={styles.loaderContainer}>
        <CircularProgress size={24} />
      </div>
    ),
  }
);

const availableDates = [
  "2026-02-02",
  "2026-02-03",
  "2026-02-06",
  "2026-02-07",
  "2026-02-10",
  "2026-02-11",
  "2026-02-14",
  "2026-02-18",
  "2026-02-19",
  "2026-02-23",
  "2026-02-26",
  "2026-02-27",
];

const availableTimes = ["12:00", "15:00", "18:00"];

const timeSlotLabels: { [key: string]: string } = {
  "12:00": "12:00 PM",
  "15:00": "3:00 PM",
  "18:00": "6:00 PM",
};

interface BookingSlot {
  selectedDate: string;
  selectedTime: string;
}

export default function Calendar() {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<BookingSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const amount = 10.5;

  // Pre-fill name and email from session if available
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch("/api/bookings");

        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data);
        } else {
          console.error("Failed to fetch booked slots.");
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
    setMounted(true);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!isValid) {
      setError("Please fill in all required fields with valid information.");
    } else {
      setError(null);
    }

    return isValid;
  };

  const isDateAvailable = (date: Dayjs | null) => {
    if (!date) return false;

    const formattedDate = date.format("YYYY-MM-DD");
    const todayDate = dayjs().format("YYYY-MM-DD");

    return (
      formattedDate !== todayDate &&
      availableDates.includes(formattedDate) &&
      !availableTimes.every((time) =>
        bookedSlots.some(
          (slot) =>
            slot.selectedDate === formattedDate &&
            slot.selectedTime === dayjs(time, "HH:mm").format("HH:00 A")
        )
      )
    );
  };

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedDate) return false;

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const timeObj = dayjs(time, "HH:mm");
    const formattedTime = timeObj.format("HH:00 A");

    const isBooked = bookedSlots.some(
      (slot) =>
        slot.selectedDate === formattedDate &&
        slot.selectedTime === formattedTime
    );
    return !isBooked;
  };

  if (!mounted) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress className="align-center" size={60} />
        <p className={styles.loading}>Loading booking calendar...</p>
      </div>
    );
  }

  return (
    <>
      <main className={styles.calendarContainer}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>Book Your Appointment</h1>
          <p className={styles.heroSubTitle}>
            Select a date and time that works for you
          </p>
        </div>

        <div className={styles.bookingCard}>
          <div className={styles.bookingForm}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError && e.target.value.trim()) {
                  setNameError(false);
                  setError(null);
                }
              }}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ec4899",
                  },
                },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError && validateEmail(e.target.value)) {
                  setEmailError(false);
                  setError(null);
                }
              }}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={emailError}
              helperText={emailError ? "Valid email is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ec4899",
                  },
                },
              }}
            />
          </div>

          <div className={styles.dateTimeSection}>
            <div className={styles.calendarWrapper}>
              <h3 className={styles.sectionTitle}>Select Date</h3>
              <DateCalendar
                disablePast
                value={selectedDate}
                onChange={(newDate) => {
                  if (newDate && isDateAvailable(newDate)) {
                    setSelectedDate(newDate);
                    setSelectedTime(null);
                  }
                }}
                shouldDisableDate={(date) => !isDateAvailable(date)}
                sx={{
                  width: "100%",
                  "& .MuiPickersDay-root": {
                    "&.Mui-selected": {
                      backgroundColor: "#ec4899",
                      "&:hover": {
                        backgroundColor: "#db2777",
                      },
                    },
                  },
                }}
              />
            </div>

            <div className={styles.timePickerWrapper}>
              <h3 className={styles.sectionTitle}>Select Time</h3>
              <div className={styles.timeSlots}>
                {availableTimes.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  const isSelected = selectedTime?.format("HH:mm") === time;

                  return (
                    <button
                      key={time}
                      onClick={() => {
                        if (isAvailable && selectedDate) {
                          setSelectedTime(dayjs(time, "HH:mm"));
                        }
                      }}
                      disabled={!selectedDate || !isAvailable}
                      className={`${styles.timeSlot} ${
                        isSelected ? styles.timeSlotSelected : ""
                      } ${!isAvailable ? styles.timeSlotDisabled : ""}`}
                    >
                      {timeSlotLabels[time]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && (
            <Alert severity="error" className={styles.alert}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" className={styles.alert}>
              <AlertTitle>Success!</AlertTitle>
              {success}
            </Alert>
          )}

          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "eur",
            }}
          >
            <CheckoutPage
              name={name}
              email={email}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              amount={amount}
              onSuccess={(msg) => setSuccess(msg)}
              onError={(msg) => {
                setError(msg);
                // Trigger visual validation on fields
                if (msg.toLowerCase().includes("name")) {
                  setNameError(true);
                }
                if (msg.toLowerCase().includes("email")) {
                  setEmailError(true);
                }
              }}
              clearForm={() => {
                setSelectedDate(null);
                setSelectedTime(null);
              }}
            />
          </Elements>
        </div>
      </main>
    </>
  );
}
