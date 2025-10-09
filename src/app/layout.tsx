import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/UserHeader";

export const metadata: Metadata = {
  title: "BookIndoor",
  description: "Book indoor grounds easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-1">{children}</main>
        <footer className="bg-green-100 text-center py-4 text-sm text-green-800 border-t border-green-200 mt-10">
          © {new Date().getFullYear()} <span className="font-semibold">BookIndoor</span>. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
