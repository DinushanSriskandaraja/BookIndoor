

// "use client";
// import React from "react";

// interface CalendarProps {
//   currentDate: Date;
//   selectedDate: string | null;
//   onDateClick: (date: string) => void;
//   bookedSlots?: string[];
//   onMonthChange: (newDate: Date) => void;
// }

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// export default function Calendar({
//   currentDate,
//   selectedDate,
//   onDateClick,
//   bookedSlots = [],
//   onMonthChange,
// }: CalendarProps) {
//   const prevMonth = () => onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   const nextMonth = () => onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

//   const generateCalendar = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days: (number | null)[] = Array(firstDay).fill(null);
//     for (let d = 1; d <= daysInMonth; d++) days.push(d);
//     return days;
//   };

//   const calendarDays = generateCalendar();

//   return (
//     <div>
//       {/* Month Navigation */}
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={prevMonth} className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-gray-800 transition">Prev</button>
//         <span className="font-semibold text-gray-800 text-lg">
//           {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
//         </span>
//         <button onClick={nextMonth} className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-gray-800 transition">Next</button>
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2 text-center mb-6">
//         {daysOfWeek.map(day => <div key={day} className="font-semibold text-gray-600">{day}</div>)}

//         {calendarDays.map((day, idx) =>
//           day ? (
//             <button
//               key={idx}
//               onClick={() => {
//                 const yyyy = currentDate.getFullYear();
//                 const mm = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//                 const dd = day.toString().padStart(2, "0");
//                 onDateClick(`${yyyy}-${mm}-${dd}`);
//               }}
//               className={`px-4 py-2 rounded-lg transition ${
//                 selectedDate === `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
//                   ? "bg-blue-500 text-white shadow-md scale-105"
//                   : "hover:bg-blue-100 text-gray-800"
//               }`}
//             >
//               {day}
//             </button>
//           ) : (
//             <div key={idx}></div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }
