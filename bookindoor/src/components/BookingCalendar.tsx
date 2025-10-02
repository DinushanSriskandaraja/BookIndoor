// "use client";
// import { useState } from "react";
// import Calendar from "./Calendar";
// import TimePicker from "./TimePicker";

// export default function BookingCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [bookedSlots, setBookedSlots] = useState<string[]>([]); // example booked slots

//   const handleDateClick = (date: string) => {
//     setSelectedDate(date);
//     setShowTimePicker(true);
//   };

//   const handleConfirm = (selectedTimes: string[]) => {
//     // Add booked slots if needed or trigger parent action
//     console.log(selectedDate, selectedTimes);
//     setShowTimePicker(false);
//   };

//   return (
//     <div className="mt-6">
//       {!showTimePicker && (
//         <Calendar
//           currentDate={currentDate}
//           selectedDate={selectedDate}
//           onDateClick={handleDateClick}
//           bookedSlots={bookedSlots}
//           onMonthChange={setCurrentDate}
//         />
//       )}

//       {showTimePicker && selectedDate && (
//         <TimePicker
//           selectedDate={selectedDate}
//           bookedSlots={bookedSlots}
//           onConfirm={handleConfirm}
//         />
//       )}
//     </div>
//   );
// }
