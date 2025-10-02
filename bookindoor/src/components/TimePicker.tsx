// "use client";
// import React, { useState } from "react";

// interface TimePickerProps {
//   selectedDate: string;
//   bookedSlots?: string[];
//   onConfirm: (selectedTimes: string[]) => void;
// }

// export default function TimePicker({ selectedDate, bookedSlots = [], onConfirm }: TimePickerProps) {
//   const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

//   const slots = Array.from({ length: 15 }, (_, i) => `${(i + 9).toString().padStart(2, "0")}:00`);

//   const bookedForDate = bookedSlots.filter(s => s.startsWith(selectedDate));

//   const toggleSlot = (slot: string) => {
//     if (selectedTimes.includes(slot)) setSelectedTimes(selectedTimes.filter(s => s !== slot));
//     else setSelectedTimes([...selectedTimes, slot]);
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-4 shadow-md mb-6">
//       <h4 className="text-lg font-semibold text-gray-800 mb-2">Select Time for {selectedDate}</h4>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
//         {slots.map(slot => {
//           const isBooked = bookedForDate.includes(`${selectedDate} ${slot}`);
//           const isSelected = selectedTimes.includes(slot);
//           return (
//             <button
//               key={slot}
//               onClick={() => !isBooked && toggleSlot(slot)}
//               disabled={isBooked}
//               className={`px-3 py-2 rounded-lg text-sm font-medium transition transform ${
//                 isBooked
//                   ? "bg-red-500 text-white cursor-not-allowed"
//                   : isSelected
//                   ? "bg-green-600 text-white shadow-md scale-105"
//                   : "bg-white hover:bg-gray-200 text-gray-800"
//               }`}
//               title={isBooked ? "Already booked" : ""}
//             >
//               {slot}
//             </button>
//           );
//         })}
//       </div>
//       <div className="flex justify-end mt-4">
//         <button
//           onClick={() => onConfirm(selectedTimes)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           OK
//         </button>
//       </div>
//     </div>
//   );
// }
