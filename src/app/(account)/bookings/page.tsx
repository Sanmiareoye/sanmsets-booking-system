import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Booking from "@/app/components/Bookings";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h2>Client Session</h2>
      <Booking />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </div>
  );
};

export default Bookings;
