import React from "react";
import { motion } from "framer-motion";

export default function NotInMood({ onRestart }) {
  return (
    <motion.div
      key="notmood"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center px-6 py-10 rounded-3xl shadow-2xl bg-linear-to-br 
                 from-gray-50 via-white to-gray-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
                 border border-gray-200 dark:border-gray-700 backdrop-blur-sm
                 max-w-2xl mx-auto"
    >
      {/* Header */}
      <h2
        className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text 
                     bg-linear-to-r from-pink-500 to-orange-400"
      >
        😴 Not in the mood to cook?
      </h2>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
        No worries! Treat yourself and order something delicious from your
        favorite food platforms.
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <a
          href="https://www.zomato.com"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto bg-linear-to-r from-red-500 to-pink-600 
                     text-white px-6 py-3 rounded-xl font-semibold shadow-lg
                     hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          🍔 Order on Zomato
        </a>

        <a
          href="https://www.swiggy.com"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto bg-linear-to-r from-orange-500 to-yellow-500 
                     text-white px-6 py-3 rounded-xl font-semibold shadow-lg
                     hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          🍕 Order on Swiggy
        </a>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="bg-linear-to-r from-gray-500 to-gray-700 
                   text-white px-6 py-3 rounded-xl font-semibold shadow-md
                   hover:scale-105 active:scale-95 transition-transform duration-300"
      >
        🔁 Back to Home
      </button>
    </motion.div>
  );
}
