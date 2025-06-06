"use client";
import StockTicker from "../components/StockTicker";
import Navbar from "../components/Navbar";
import { useRef } from "react";
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSend = () => {
    if (inputRef.current) {
      console.log(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative pb-12">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto gap-8 mt-2 flex-col sm:flex-row">
        {/* Sidebar */}
        <aside className="w-full sm:w-56 min-w-[180px] flex flex-col pt-4 mb-6 sm:mb-0">
          <h2 className="text-xl font-bold mb-4">History</h2>
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 rounded-full bg-neutral-800 w-5/6" />
            ))}
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 pt-2 w-full">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center w-full mb-2 gap-2">
            <input
              ref={inputRef}
              className="w-full rounded-full bg-neutral-400/60 px-6 py-3 text-lg text-white placeholder:text-neutral-300 focus:outline-none"
              placeholder="Search..."
              style={{ fontWeight: 500 }}
              onKeyDown={handleKeyDown}
            />
            {/* Attach Image Button */}
            <button
              type="button"
              className="ml-2 flex items-center justify-center p-2 rounded-full hover:bg-neutral-300"
              onClick={handleAttachClick}
              aria-label="Attach image"
            >
              <PaperClipIcon className="h-6 w-6 text-gray-700" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
            {/* Send/Search Button */}
            <button
              type="button"
              className="ml-2 flex items-center justify-center p-2 rounded-full bg-green-500 hover:bg-green-600"
              onClick={handleSend}
              aria-label="Send search"
            >
              <PaperAirplaneIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          {/* Cards Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 h-32 rounded-xl bg-neutral-900/80 w-full" />
            ))}
          </div>
          {/* Content Skeletons */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="h-6 rounded-full bg-neutral-800 w-full sm:w-5/6" />
            <div className="h-6 rounded-full bg-neutral-800 w-4/6" />
            <div className="h-6 rounded-full bg-neutral-800 w-3/6" />
          </div>
        </main>
      </div>
      {/* Stock Ticker */}
      <StockTicker />
    </div>
  );
}
