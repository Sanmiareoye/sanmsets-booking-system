// src/app/(account)/bookings/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import Link from "next/link";
import { RiCalendarLine, RiTimeLine } from "react-icons/ri";
import Booking from "@/app/components/Bookings";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-bold mb-4 text-gray-800">
            Access Your Bookings
          </h2>
          <p className="mb-6 text-gray-600">
            Please sign in to view your appointment history.
          </p>
          <Link
            href="/login"
            className="bg-[#f07de6] hover:bg-[#d958d8] text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      bookings: {
        orderBy: {
          selectedDate: "asc",
        },
      },
    },
  });

  if (!user || !user.bookings.length) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-playfair font-bold mb-4 text-gray-800">
            No Bookings Found
          </h2>
          <p className="mb-6 text-gray-600">
            You haven&apos;t made any appointments yet.
          </p>
          <Link
            href="/calendar"
            className="bg-[#f07de6] hover:bg-[#d958d8] text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <br></br>
        <h1 className="text-2xl font-playfair font-bold text-gray-800 mb-2">
          Welcome back {session.user.name?.split(" ")[0]}, here are your
          Appointments 💕
        </h1>
        <p className="text-gray-600">
          Here are all your upcoming and past bookings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {user.bookings.map((booking: any) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start mb-4">
              <div className="bg-[#f07de6] text-white p-3 rounded-full mr-4">
                <RiCalendarLine size={20} />
              </div>
              <div>
                <h3 className="font-playfair font-bold text-lg text-gray-800">
                  {new Date(booking.selectedDate).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div className="flex items-center mt-2 text-gray-600">
                  <RiTimeLine className="mr-2" />
                  <span>{booking.selectedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Booking ID: {booking.id.slice(0, 8)}
              </span>
              <button className="text-[#f07de6] hover:text-[#d958d8] text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/calendar"
          className="inline-flex items-center bg-[#f07de6] hover:bg-[#d958d8] text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Book Another Appointment
        </Link>
      </div>
    </div>
  );
}
