import NextAuth from "next-auth";
import { List } from "postcss/lib/list";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      bookings?: Booking[];
    };
    Booking: {
      id: string;
      selectedDate: Date;
      selectedTime: string;
    };
  }
}
