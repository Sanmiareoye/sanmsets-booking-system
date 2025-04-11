import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      bookings?: {
        selectedTime: string;
        selectedDate: string;
        userId: string;
      }[];
    };
  }
}
