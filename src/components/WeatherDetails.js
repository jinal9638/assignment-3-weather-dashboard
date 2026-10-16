import React from 'react';

export default function WeatherDetails({ weather, lastUpdated }) {
  if (!weather) return null;

  const { name, sys, main, weather: weatherInfo, wind } = weather;
  const condition = weatherInfo[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg mx-auto w-full transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {name}, {sys?.country}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-1">
            {condition?.description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${condition?.icon}@2x.png`}
          alt={condition?.description}
          className="w-16 h-16 bg-blue-50 dark:bg-gray-700 rounded-full"
        />
      </div>

      <div className="text-center my-6">
        <span className="text-6xl font-extrabold text-gray-900 dark:text-white">
          {Math.round(main?.temp)}°C
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Feels like {Math.round(main?.feels_like)}°C
        </p>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Humidity</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{main?.humidity}%</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Wind Speed</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{wind?.speed} m/s</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Min / Max</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">
            {Math.round(main?.temp_min)}° / {Math.round(main?.temp_max)}°
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Pressure</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{main?.pressure} hPa</p>
        </div>
      </div>

      {lastUpdated && (
        <p className="text-xs text-center text-gray-400 mt-6">
          Auto-refreshed at: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}