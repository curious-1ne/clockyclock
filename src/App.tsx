// File: src/App.tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css"; // ✅ Tailwind styles

import RadioHourPlanner from "./RadioHourPlanner";
import Homepage from "./components/Homepage"; // ✅ This is your Plasmic wrapper

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* ✅ Top bar */}
      <div className="fixed top-4 left-4 bg-green-600 text-white p-2 z-50 rounded shadow-lg">
        ✅ Tailwind works!
      </div>

      {/* 🧠 Your synced Plasmic design */}
      <div className="my-8 border-b border-gray-700 pb-6">
        <Homepage />
      </div>

      {/* 🎨 Vite + React boilerplate */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4 mb-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-4">Vite + React</h1>
        <div className="card bg-gray-800 p-6 rounded shadow-lg text-white">
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
          <p className="mt-4">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs mt-4 text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      {/* 📻 Your existing planner */}
      <div className="mt-12">
        <RadioHourPlanner />
      </div>
    </div>
  );
}

export default App;
