"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StockTicker from "./components/StockTicker";
import Navbar from "./components/Navbar";

const slides = [
  {
    text: (
      <>
        Making sense of the current <span className="text-green-400">economy</span> <br /> for <span className="text-green-400">Gen Z</span>
      </>
    ),
  },
  {
    text: (
      <>
        <span>2025 has been <span className="text-yellow-400">interesting</span>...</span>
      </>
    ),
  },
  {
    text: (
      <>
        Trade wars, recession, massive layoffs, <span className="text-red-500">tariffs</span>...
      </>
    ),
  },
  {
    text: (
      <>
        The receiving end of most of these <span className="text-red-500">challenges</span> are most Americans, specifically <span className="text-green-400">Gen Z</span>
      </>
    ),
  },
  {
    text: (
      <>
        Yet we're also the most <span className="text-red-500">ignorant</span> generation
      </>
    ),
  },
  {
    text: (
      <>
        But that changes now with <span className="text-green-400">Interpreter</span>
      </>
    ),
  },
  {
    text: (
      <>
        <span className="text-green-400">Search</span> with natural language to see how policies have affected your favorite products
      </>
    ),
  },
  {
    text: (
      <>
        <span className="text-green-400">Compare</span> prices at different retailers to get the best deal
      </>
    ),
  },
  {
    text: (
      <>
        Get a <span className="text-green-400">curated</span> newsfeed on the economy simplified for Gen-Z
      </>
    ),
  },
  {
    text: (
      <>
        Make sense of the market and stay informed with <span className="text-green-400">Interpreter</span>
        <br />
        <Link href="/dashboard">
          <button className="mt-8 px-6 py-3 bg-green-500 text-white rounded-full text-lg font-bold shadow-lg hover:bg-green-600 transition">Try now</button>
        </Link>
      </>
    ),
  },
];

const STOCKS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];

function useStockPrices() {
  const [prices, setPrices] = useState(
    STOCKS.map((symbol) => ({ symbol, price: 0, change: 0 }))
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function fetchPrices() {
      // Replace with a real API in production
      // Simulate random price changes for demo
      setPrices((prev) =>
        prev.map((stock) => {
          const change = (Math.random() - 0.5) * 5;
          return {
            ...stock,
            price: Math.max(100, stock.price + change),
            change: change,
          };
        })
      );
    }
    fetchPrices();
    interval = setInterval(fetchPrices, 3000);
    return () => clearInterval(interval);
  }, []);
  return prices;
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slide < slides.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setSlide((s) => s + 1);
          setFade(true);
        }, 600); // fade out duration
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [slide]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Navbar />
      </div>
      {/* Slides */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-0">
        <div
          className={`transition-opacity duration-600 ease-in-out text-2xl sm:text-5xl font-bold text-center max-w-xs sm:max-w-3xl mx-auto ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{ minHeight: 180 }}
        >
          {slides[slide].text}
        </div>
      </div>
      {/* Stock Ticker */}
      <StockTicker />
    </div>
  );
}
