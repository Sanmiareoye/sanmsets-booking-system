"use client";
import { useSession } from "next-auth/react";

const Booking = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return <pre>{JSON.stringify(session)}</pre>;
  }
  return <h2 className="text-2xl align-center">Please login to book.</h2>;
};

export default Booking;
