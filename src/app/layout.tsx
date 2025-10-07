import type { Metadata } from "next";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookIndoor",
  description: "Book indoor grounds easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-900 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-green-700 shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <span className="text-2xl font-bold text-white tracking-wide">
              BookIndoor
            </span>
            <Link href="/login">
              <UserIcon className="w-8 h-8 text-white hover:text-green-200 cursor-pointer transition duration-200" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-6 py-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-green-100 text-center py-4 text-sm text-green-800 border-t border-green-200 mt-10">
          © {new Date().getFullYear()} <span className="font-semibold">BookIndoor</span>. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
