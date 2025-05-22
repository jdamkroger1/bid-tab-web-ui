"use client";
import React, { useState, useEffect } from "react";

export default function BidTabLookup() {
  const [item, setItem] = useState("Concrete");
  const [year, setYear] = useState("2023");
  const [stat, setStat] = useState("average");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `https://bid-tab-api.onrender.com/items?item=${item}&year=${year}&stat=${stat}`
      );
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to fetch data." });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bid Tab Data Lookup</h1>
      <div className="grid grid-cols-1 gap-4">
        <input
          className="border rounded px-3 py-2"
          placeholder="Item description (e.g. Concrete)"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Year (e.g. 2023)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={stat}
          onChange={(e) => setStat(e.target.value)}
        >
          <option value="average">Average</option>
          <option value="median">Median</option>
          <option value="count">Count</option>
        </select>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lookup
        </button>
      </div>

      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {result && (
          <div className="border p-4 rounded bg-gray-50 text-sm">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}