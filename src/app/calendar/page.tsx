'use client';

import { useState, useEffect } from "react";
import { DateCalendar, DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TextField, Button, CircularProgress, Alert, AlertTitle } from "@mui/material";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './calendar.module.css';

const availableDates = [
  '2025-04-01',
  '2025-04-02',
  '2025-04-03',
  '2025-04-04',
  '2025-04-05',
  '2025-04-07',
  '2025-04-08',
  '2025-04-09',
  '2025-04-10',
  '2025-04-11',
  '2025-04-12',
  '2025-04-14',
  '2025-04-15',
  '2025-04-16',
  
  '2025-04-22',
  '2025-04-23',
  '2025-04-24',
  '2025-04-25',
  '2025-04-26',
  '2025-04-28',
  '2025-04-29',
  '2025-04-30'
  ];


const availableTimes = ['12:00', '15:00', '18:00'];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<{ selectedDate: string; selectedTime: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        if (response.ok) {
          setBookedSlots(data);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      } finally {
        setMounted(true);
      }
    };

    fetchBookedSlots();
  }, []);

  const isDateAvailable = (date: Dayjs | null) => {
    if (!date) return false;
    
    const formattedDate = date.format('YYYY-MM-DD');
    const todayDate = dayjs().format('YYYY-MM-DD');
    
    // Don't allow booking for today
    if (formattedDate === todayDate) return false;
    
    // Check if date is in availableDates and has available times
    return availableDates.includes(formattedDate) && 
      availableTimes.some(time => {
        const formattedTime = dayjs(time, 'HH:mm').format('HH:00');
        return !bookedSlots.some(
          slot => slot.selectedDate === formattedDate && 
          slot.selectedTime === formattedTime
        );
      });
  };

  const isTimeAvailable = (time: Dayjs | null) => {
    if (!time || !selectedDate) return false;
    
    const formattedTime = time.format('HH:00');
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    
    return availableTimes.includes(formattedTime) &&
      !bookedSlots.some(
        slot => slot.selectedDate === formattedDate && 
        slot.selectedTime === formattedTime
      );
  };

  const handleBooking = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!userName.trim() || userName.trim().split(' ').length < 2) {
        throw new Error('Please enter your full name (first and last)');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        throw new Error('Please enter a valid email address');
      }

      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time');
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName.trim(),
          email: userEmail.trim(),
          date: selectedDate.format('YYYY-MM-DD'),
          time: selectedTime.format('HH:00')
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking failed');

      // Update local state with new booking
      setBookedSlots(prev => [...prev, {
        selectedDate: selectedDate.format('YYYY-MM-DD'),
        selectedTime: selectedTime.format('HH:00')
      }]);

      setSuccess("Booking confirmed! You'll receive a confirmation email shortly. Don't forget to pay your €10 deposit 💕");
      setUserName('');
      setUserEmail('');
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <div className={styles.loading}>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className={styles.calendarContainer}>
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            <br/>
          </h1>
          <p className={styles.heroSubtitle}>
            A non-refundable deposit of <strong>€10</strong> is required to secure your booking.
            Please check your confirmation email for payment instructions.
          </p>
        </div>

        <div className={styles.bookingCard}>
          <div className={styles.bookingForm}>
            <TextField
              label="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={error?.includes('name')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                },
              }}
            />

            <TextField
              label="Email Address"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={error?.includes('email')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                },
              }}
            />
          </div>

          <div className={styles.dateTimeSection}>
            <div className={styles.calendarWrapper}>
              <h3 className={styles.sectionTitle}>Select Date</h3>
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
                  width: '100%',
                  '& .MuiPickersDay-root': {
                    '&.Mui-selected': {
                      backgroundColor: '#ec4899',
                      '&:hover': {
                        backgroundColor: '#db2777',
                      },
                    },
                  },
                }}
              />
            </div>

            <div className={styles.timePickerWrapper}>
              <h3 className={styles.sectionTitle}>Select Time</h3>
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
                minTime={dayjs().set('hour', 9).set('minute', 0)}
                maxTime={dayjs().set('hour', 18).set('minute', 0)}
                format="HH:00"
                ampm={false}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ec4899',
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

          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={isLoading || !selectedDate || !selectedTime}
            className={styles.bookButton}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Processing...' : 'Book Appointment'}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}