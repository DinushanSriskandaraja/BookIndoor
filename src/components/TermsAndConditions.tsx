// "use client";

// import { useState } from "react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

// export default function TermsSection() {
//   const [open, setOpen] = useState(false);

//   return (
//     <section className="py-16 px-6 bg-green-900/30 text-white">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer"
//           onClick={() => setOpen(!open)}
//         >
//           <h2 className="text-3xl font-bold">Terms & Conditions</h2>
//           {open ? (
//             <ChevronUpIcon className="w-6 h-6 text-green-300" />
//           ) : (
//             <ChevronDownIcon className="w-6 h-6 text-green-300" />
//           )}
//         </div>

//         {/* Content */}
//         {open && (
//           <div className="mt-6 text-green-100 space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-900/20">
//             <p>
//               Welcome to BookIndoor! By using our website and services, you
//               agree to the following terms and conditions. Please read them
//               carefully.
//             </p>
//             <p>
//               1. <strong>Bookings:</strong> All bookings are subject to
//               availability. Users are responsible for providing accurate
//               information.
//             </p>
//             <p>
//               2. <strong>Payments:</strong> Payments must be completed at the
//               time of booking. Any refunds are subject to our cancellation
//               policy.
//             </p>
//             <p>
//               3. <strong>Usage:</strong> Users must comply with all rules and
//               regulations of the indoor grounds.
//             </p>
//             <p>
//               4. <strong>Liability:</strong> BookIndoor is not responsible for
//               any injuries or damages incurred while using the facilities.
//             </p>
//             <p>
//               5. <strong>Privacy:</strong> User data will be handled according
//               to our Privacy Policy.
//             </p>
//             <p>
//               6. <strong>Modifications:</strong> BookIndoor reserves the right
//               to update these terms at any time. Continued use of the service
//               constitutes acceptance of updated terms.
//             </p>
//             <p>
//               7. <strong>Contact:</strong> For any questions or concerns about
//               these terms, please contact our support team.
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
