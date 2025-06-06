"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 py-4 gap-4 sm:gap-0">
      <button
        className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition self-start"
        onClick={() => router.push("/")}
        aria-label="Go to home"
      >
        <span role="img" aria-label="feather">🪶</span>
        <span className="ml-1">Interpreter</span>
      </button>
      <div className="flex gap-6 text-base justify-center">
        <a href="/" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Features</a>
      </div>
      <button
        className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow hover:bg-neutral-200 transition self-end"
        onClick={() => router.push("/dashboard")}
      >
        Ask now
      </button>
    </nav>
  );
} 