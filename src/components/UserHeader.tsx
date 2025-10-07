"use client";

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";

export default function UserHeader() {
  return (
    <header className="w-full bg-green-600 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white tracking-wide">
        BookIndoor
      </h1>
      <Link href="/login">
        <UserIcon className="w-8 h-8 text-white hover:text-gray-200 cursor-pointer transition duration-200" />
      </Link>
    </header>
  );
}
