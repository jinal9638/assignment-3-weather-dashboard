## Weather Dashboard

A responsive React Weather Dashboard application built with Create React App, Tailwind CSS v3, and the Open-Meteo API. The application provides real-time weather information, debounced search functionality, and automatic updates using React hooks.

## Key Features

Real-Time Weather Metrics: Fetches live temperature, country code, and wind speeds without requiring API keys.

Debounced Search Input: Custom useDebounce hook minimizes unnecessary API requests during typing.

Auto-Refresh Mechanism: Automatically fetches updated weather data every 60 seconds using setInterval inside useEffect.

Request Cancellation: Implements AbortController in useEffect cleanup to cancel pending network fetches when searching new locations or unmounting components.

Sunny Day UI Theme: Bright, glassmorphic UI built with Tailwind CSS, custom blur filters, and vibrant warm gradients.

Error & Loading States: Built-in spinners and error messaging for non-existent cities or network failures.

## Tech Stack

Frontend Library: React 18 (Create React App)

Styling: Tailwind CSS (v3) + PostCSS

API: Open-Meteo Geocoding & Forecast API

Version Control: Git & GitHub

## Project Structure

assignment-3-weather-dashboard/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   |── WeatherDetails.js
|   |   |── SearchBar.js
|   |── hooks/
|   |   |──useDebounce.js       
│   ├── App.js
│   ├── index.js
│   |── index.css
|   |── App.css
├── .gitignore
├── package.json
|── package-lock.json
├── postcss.config.js
├── tailwind.config.js 
└── README.md


