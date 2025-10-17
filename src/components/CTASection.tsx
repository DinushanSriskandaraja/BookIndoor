"use client";
export default function CTASection() {
  return (
    <section className="py-20 bg-green-900 text-center relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-green-100 mb-6">
        Ready Book Your Ground?
      </h2>
      <p className="text-green-200 mb-10 text-lg md:text-xl">
        Discover indoor grounds, book instantly, and enjoy your sports journey.
      </p>
      <a
        href="/user"
        className="px-10 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-400 hover:scale-105 transition-all duration-300"
      >
        Explore Grounds Now
      </a>
      <div className="absolute w-80 h-80 bg-green-300/20 rounded-full blur-3xl top-0 right-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-green-900/20 rounded-full blur-3xl bottom-0 left-10 animate-pulse" />
    </section>
  );
}
