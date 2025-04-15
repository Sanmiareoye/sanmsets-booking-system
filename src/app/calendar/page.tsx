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
  "2025-04-01",
  "2025-04-02",
  "2025-04-03",
  "2025-04-04",
  "2025-04-05",
  "2025-04-07",
  "2025-04-08",
  "2025-04-09",
  "2025-04-10",
  "2025-04-11",
  "2025-04-12",
  "2025-04-14",
  "2025-04-15",
  "2025-04-16",
  "2025-04-22",
  "2025-04-23",
  "2025-04-24",
  "2025-04-25",
  "2025-04-26",
  "2025-04-28",
  "2025-04-29",
  "2025-04-30",
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

  const handleBooking = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!name.trim() || name.trim().split(" ").length < 2) {
        throw new Error("Please enter your full name (first and last)");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!selectedDate || !selectedTime) {
        throw new Error("Please select both date and time");
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime.format("HH:00 A"),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Booking failed");

      setSuccess(
        "Booking confirmed! You'll receive a confirmation email shortly. Don't forget to pay your deposit 💕"
      );

      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
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
          <p className={styles.heroSubtitle}>
            A non-refundable deposit of <strong>€10</strong> is required to
            secure your booking. Please check your confirmation email for
            payment instructions.
          </p>
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

          <>
            {session?.user ? (
              <Button
                variant="contained"
                onClick={handleBooking}
                disabled={isLoading || !selectedDate || !selectedTime}
                className={styles.bookButton}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isLoading ? "Processing..." : "Book Appointment"}
              </Button>
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
                You must be logged in to make a booking, login here. 💕
              </Button>
            )}
          </>
        </div>
      </main>
    </>
  );
}
