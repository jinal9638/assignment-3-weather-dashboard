import React from 'react';

export default function SearchBar({ city, setCity, onSearch, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto mb-6">
      <input
        type="text"
        placeholder="Enter city name (e.g., Mumbai, London)..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
      />
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        ) : (
          'Get Weather'
        )}
      </button>
    </form>
  );
}