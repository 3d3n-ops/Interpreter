"use client";
import { useState, useEffect } from "react";

export default function StockTicker() {
  const [data, setData] = useState<{ [key: string]: number | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchTicker() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ticker`);
      if (!res.ok) throw new Error("Failed to fetch ticker data");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-90 border-t border-neutral-800 z-50 overflow-hidden">
      <div className="ticker-move flex whitespace-nowrap">
        {loading && <div className="px-6 py-1 text-neutral-400">Loading ticker...</div>}
        {error && <div className="px-6 py-1 text-red-400">{error}</div>}
        {data &&
          Object.entries(data).map(([name, price]) => (
            <div
              key={name}
              className={
                "px-6 py-1 font-mono text-sm flex items-center text-green-400"
              }
            >
              {name}: {price !== null && price !== undefined ? price.toFixed(2) : "N/A"}
            </div>
          ))}
        {/* Duplicate for seamless loop */}
        {data &&
          Object.entries(data).map(([name, price]) => (
            <div
              key={name + '-dup'}
              className={
                "px-6 py-1 font-mono text-sm flex items-center text-green-400"
              }
            >
              {name}: {price !== null && price !== undefined ? price.toFixed(2) : "N/A"}
            </div>
          ))}
      </div>
    </div>
  );
} 