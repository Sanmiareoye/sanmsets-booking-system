"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Booking {
  selectedDate: string;
  selectedTime: string;
}

const Booking = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user) {
        const res = await fetch("/api/my-bookings");
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings.");
        }
      }
    };

    fetchBookings();
  }, [session]);

  if (!session?.user) {
    return <h2 className="text-2xl align-center">Please login to book.</h2>;
  }

  if (!bookings) {
    return <p>Loading your bookings...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Your Bookings:</h2>
      <ul className="list-disc ml-6 mt-2">
        {bookings.map((b, idx) => (
          <li key={idx}>
            {b.selectedDate} @ {b.selectedTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
