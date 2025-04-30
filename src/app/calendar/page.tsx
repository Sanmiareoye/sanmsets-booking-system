"use client";

import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect, useMemo, useCallback } from "react";
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

const DesktopTimePicker = dynamic(
  () => import("@mui/x-date-pickers").then((mod) => mod.DesktopTimePicker),
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
  "2025-04-25",
  "2025-04-26",
  "2025-04-28",
  "2025-04-29",
  "2025-04-30",
  "2025-05-01",
  "2025-05-02",
  "2025-05-03",

  "2025-05-06",
  "2025-05-07",
  "2025-05-08",
  "2025-05-09",
  "2025-05-10",

  "2025-05-12",
  "2025-05-13",
  "2025-05-14",
  "2025-05-15",
  "2025-05-16",
  "2025-05-17",

  "2025-05-19",
  "2025-05-20",
  "2025-05-21",
  "2025-05-22",
];

const availableTimes = ["12:00", "15:00", "18:00"];

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

  const amount = 10.5;

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
          console.log("yassssssss");
        } else {
          console.log(response.body);
          console.error("Failed to fetch booked slots.");
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log("booked slots", bookedSlots);

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

  const isTimeAvailable = (time: Dayjs | null) => {
    if (!time || !selectedDate) return false;

    const formattedTime = time.format("HH:00 A");
    const formattedDate = selectedDate.format("YYYY-MM-DD");

    const isAvailableTime = availableTimes.includes(time.format("HH:mm"));

    const isBooked = bookedSlots.some(
      (slot) =>
        slot.selectedDate === formattedDate &&
        slot.selectedTime === formattedTime
    );
    return isAvailableTime && !isBooked;
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
          <br />
          <br />
          <h1 className={styles.heroTitle}></h1>
          {session?.user ? (
            <p className={styles.heroSubtitle}>
              A non-refundable deposit of <strong>€10</strong> is required to
              secure your booking.
            </p>
          ) : (
            <h3 className={styles.heroSubTitle}>
              You can check availability here but you must log in to make a
              booking.
            </h3>
          )}
        </div>

        <div className={styles.bookingCard}>
          {session?.user ? (
            <div className={styles.bookingForm}>
              <TextField
                label="Full Name"
                value={name}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={error?.includes("name")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec4899",
                    },
                  },
                }}
              />{" "}
              <TextField
                label="Email Address"
                type="email"
                value={email}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                error={error?.includes("email")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec4899",
                    },
                  },
                }}
              />
            </div>
          ) : (
            <></>
          )}

          <div className={styles.dateTimeSection}>
            <div className={styles.calendarWrapper}>
              <>
                {session?.user ? (
                  <h3 className={styles.sectionTitle}>Select Date</h3>
                ) : (
                  <h3 className={styles.sectionTitle}>Date</h3>
                )}
              </>
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
              <>
                {session?.user ? (
                  <h3 className={styles.sectionTitle}>Select Time</h3>
                ) : (
                  <h3 className={styles.sectionTitle}>Time</h3>
                )}
              </>
              <DesktopTimePicker
                label="Available Time Slots"
                views={["hours"]}
                value={selectedTime}
                onChange={(newTime) => {
                  if (newTime && isTimeAvailable(newTime)) {
                    setSelectedTime(newTime);
                  }
                }}
                shouldDisableTime={(time) => !isTimeAvailable(time)}
                minTime={dayjs().set("hour", 9).set("minute", 0)}
                maxTime={dayjs().set("hour", 18).set("minute", 0)}
                format="HH:00"
                ampm={false}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec4899",
                    },
                  },
                }}
                disabled={!selectedDate}
              />
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

          {session?.user ? (
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
                onError={(msg) => setError(msg)}
                clearForm={() => {
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
              />
            </Elements>
          ) : (
            <Button
              variant="contained"
              href="/login"
              className={styles.bookButton}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              Login here to make a booking. 💕
            </Button>
          )}
        </div>
      </main>
    </>
  );
}
