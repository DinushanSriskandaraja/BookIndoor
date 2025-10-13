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
      <body className="min-h-screen w-full flex flex-col bg-green-50 text-gray-900 overflow-x-hidden">
        {/* Header (fixed optional) */}
        <Header />

        {/* ✅ Full-width, full-height main content */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer always at the bottom */}
        <footer className="w-full bg-green-100 text-center py-4 text-sm text-green-800 border-t border-green-200">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">BookIndoor</span>. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
