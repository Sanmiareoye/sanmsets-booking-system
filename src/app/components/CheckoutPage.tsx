"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import dayjs, { Dayjs } from "dayjs";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button, CircularProgress, Alert, AlertTitle } from "@mui/material";
import styles from "../calendar/calendar.module.css";

interface CheckoutPageProps {
  name: string;
  email: string;
  selectedDate: Dayjs | null;
  selectedTime: Dayjs | null;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  clearForm?: () => void;
  amount?: number; // default to 10 if not provided
}

const CheckoutPage = ({
  name,
  email,
  selectedDate,
  selectedTime,
  onSuccess,
  onError,
  clearForm,
  amount = 10,
}: CheckoutPageProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Fetch client secret
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setLocalError("Failed to initialize payment");
      }
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    onError?.("");

    try {
      // Validate user input
      if (!name.trim() || name.trim().split(" ").length < 2) {
        throw new Error("Please enter your full name (first and last)");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!selectedDate || !selectedTime) {
        throw new Error("Please select both date and time");
      }

      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded yet");
      }

      // ✅ Step 1: Submit elements
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message || "Payment submission failed");
      }

      // ✅ Step 2: Confirm payment
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecret!,
        confirmParams: {
          return_url: `${window.location.origin}/success`, // required, even if unused
        },
        redirect: "if_required", // avoids hard redirect
      });

      if (stripeError) {
        throw new Error(stripeError.message || "Payment failed");
      }

      // ✅ Step 3: Create the booking
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime.format("HH:00 A"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      onSuccess?.(
        "Booking confirmed! You'll receive a confirmation email shortly 💌"
      );
      clearForm?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setLocalError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {localError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {localError}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        className={styles.bookButton}
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? "Processing..." : "Confirm & Pay €10"}
      </Button>
    </form>
  );
};

export default CheckoutPage;
