import React, { useState, useEffect, useCallback } from 'react';


// Custom Debounce Hook
function useDebounce(value, delay = 600) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function App() {
  const [cityInput, setCityInput] = useState('');
  const [activeCity, setActiveCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const debouncedCity = useDebounce(cityInput, 800);

  // Fetch Weather using Open-Meteo API
  const fetchWeather = useCallback(async (searchCity, signal) => {
    if (!searchCity.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1`,
        { signal }
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please check spelling.');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        { signal }
      );
      const wData = await weatherRes.json();

      setWeatherData({
        name,
        country,
        temp: Math.round(wData.current_weather.temperature),
        windSpeed: wData.current_weather.windspeed,
        weatherCode: wData.current_weather.weathercode,
      });
      setLastUpdated(new Date());
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        setWeatherData(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect with AbortController Cleanup & 60s Auto-Refresh
  useEffect(() => {
    const controller = new AbortController();
    fetchWeather(activeCity, controller.signal);

    const intervalId = setInterval(() => {
      fetchWeather(activeCity, controller.signal);
    }, 60000);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [activeCity, fetchWeather]);

  // Debounced search effect
  useEffect(() => {
    if (debouncedCity.trim().length >= 3) {
      setActiveCity(debouncedCity.trim());
    }
  }, [debouncedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setActiveCity(cityInput.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-200 to-amber-100 text-slate-800 flex flex-col items-center p-4 sm:p-8 transition-colors duration-500">
      {/* Container */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <header className="text-center mt-4">
          <div className="inline-block px-3.5 py-1 bg-white/60 backdrop-blur-md text-sky-800 text-xs font-bold rounded-full border border-white/50 mb-3 tracking-wide uppercase shadow-sm">
            ☀️ React useEffect Sunny Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            Weather Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-700/80 mt-1">
            Live weather updates • Auto-refreshes every 60s
          </p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search city (e.g., Surat, Mumbai, London)..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-lg shadow-sky-900/5 transition"
          />
          <button
            type="submit"
            disabled={isLoading || !cityInput.trim()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:text-slate-500 text-slate-900 font-bold rounded-2xl transition shadow-lg shadow-amber-500/30 flex items-center justify-center min-w-[110px]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Search'
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-700 rounded-2xl text-center text-sm font-semibold shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && !weatherData && (
          <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-white/60 shadow-xl flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-600">Fetching live weather data...</p>
          </div>
        )}

        {/* Sunny Weather Card */}
        {!isLoading && weatherData && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 flex flex-col gap-6 relative overflow-hidden">
            {/* Sun Glow Decoration */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/40 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {weatherData.name}
                </h2>
                <p className="text-xs font-bold text-sky-700 mt-1 uppercase tracking-wider">
                  {weatherData.country}
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Sunny Live
              </span>
            </div>

            {/* Temperature & Icon */}
            <div className="text-center my-2 z-10 flex flex-col items-center">
              <div className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight flex items-center justify-center">
                <span>{weatherData.temp}</span>
                <span className="text-amber-500 text-4xl sm:text-5xl font-bold ml-1">°C</span>
              </div>
              <p className="text-sm font-semibold text-slate-600 mt-2 flex items-center gap-1.5">
                <span>☀️</span> Sunny / Clear Sky
              </p>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/80 z-10">
              <div className="bg-sky-50/70 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <span className="text-xs text-sky-800 uppercase font-bold tracking-wider">Wind Speed</span>
                <p className="text-lg font-extrabold text-slate-800 mt-1">{weatherData.windSpeed} <span className="text-xs font-semibold text-slate-500">km/h</span></p>
              </div>
              <div className="bg-sky-50/70 backdrop-blur-sm p-4 rounded-2xl border border-sky-100 shadow-sm">
                <span className="text-xs text-sky-800 uppercase font-bold tracking-wider">Status</span>
                <p className="text-lg font-extrabold text-emerald-600 mt-1">Refreshed</p>
              </div>
            </div>

            {/* Last Refresh Timestamp */}
            {lastUpdated && (
              <p className="text-center text-xs font-medium text-slate-500 z-10">
                Last updated at {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}