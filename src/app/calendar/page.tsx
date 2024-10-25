'use client';

import { useState, useEffect } from "react";
import { DateCalendar, DesktopTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import { TextField, Button } from "@mui/material";
import '../globals.css';

const availableDates = [
  '2024-11-01',
  '2024-11-02',

  '2024-11-04',
  '2024-11-05',
  '2024-11-06',
  '2024-11-07',
  '2024-11-08',
  '2024-11-09',
  
  '2024-11-12',
  '2024-11-13',
  '2024-11-14',
  '2024-11-15',
  '2024-11-16',
  '2024-11-17',

  '2024-11-19',
  '2024-11-20',
  '2024-11-21',
  '2024-11-22',
  '2024-11-23',
  '2024-11-24',

  '2024-11-26',
  '2024-11-27',
  '2024-11-28',
  '2024-11-29',
  '2024-11-30',
];

const availableTimes = ['12:00 PM', '15:00 PM', '18:00 PM']; 

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<{ selectedDate: string; selectedTime: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/api/bookings'); // Adjust API endpoint if necessary
        const data = await response.json();
        if (response.ok) {
          setBookedSlots(data);
        } else {
          console.error('Failed to fetch booked slots:', data.error);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log('booked slots', bookedSlots)
  const isDateAvailable = (date: Dayjs | null) => {
    if (date) {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        if (availableDates.includes(formattedDate)) {
            const hasAvailableTimeSlots = availableTimes.some(time => {
                const formattedTime = dayjs(time, 'HH:mm A').format('HH:00 A');
                return !bookedSlots.some(slot => slot.selectedDate === formattedDate && slot.selectedTime === formattedTime);
            });
            return hasAvailableTimeSlots;
        }
    }
    return false;
};

  const isTimeAvailable = (time: Dayjs | null) => {
    if (time && selectedDate) {
      const formattedTime = dayjs(time).format('HH:00 A');
      const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
      return availableTimes.includes(formattedTime) &&
        !bookedSlots.some(slot => slot.selectedDate === formattedDate && slot.selectedTime === formattedTime);
    }
  };

  const handleBooking = async () => {
    if (userName.length <= 5) {
      setError('First and Last name please');
      return;
    }

    if (userEmail.length <= 7) {
      setError('Email must be longer than 7 characters.');
      return;
    }

    if (selectedDate && selectedTime && userName && userEmail) {

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
          time: dayjs(selectedTime).format('HH:00 A')
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Thanks for booking! You will receive a confirmation email shortly. Don't forget to pay your deposit 💕");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center align-middle">
      <br /> {}
      <h1 className="text-center mb-5 text-3xl font-bold font-playfair">Thank you for choosing sanmsets. 💕</h1>
      <p className="text-center mb-5 text-1xl font-playfair"> A deposit of <u><strong>€10</strong></u> is required to secure your booking, please check the confirmation email for directions on how to pay this.</p>
      <div className="flex flex-col justify-center gap-2 mb-6">
        <TextField
          label="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          margin="normal"
          className="w-48"
          required
        />
        <TextField
          label="Email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          className="w-48"
          required
        />
      </div>
  
      <div className="max-w-4xl mx-auto flex flex-col items-center align-middle w-full">
        <DateCalendar
          disablePast
          value={selectedDate}
          onChange={(newDate) => {
            if (isDateAvailable(newDate)) {
              setSelectedDate(newDate);
              setSelectedTime(null); 
            } 
          }}
          shouldDisableDate={(date) => !isDateAvailable(date)}
        />
        <DesktopTimePicker
          label="Choose Your Slot"
          views={["hours"]}
          value={selectedTime}
          onChange={(newTime) => {
            if (isTimeAvailable(newTime)) {
              setSelectedTime(newTime);
            } 
          }}
          shouldDisableTime={(time) => !isTimeAvailable(time)}
          format="HH:00 A"
          ampm={false}
        />
      </div>
      
      <br /> {}
      <button 
        onClick={handleBooking} 
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
        Submit
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <br/> {}
    </div>
  );
}
