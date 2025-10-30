import React from "react";
import { motion } from "framer-motion";

export default function MoodScreen({ onNext }) {
  return (
    <motion.div
      key="mood"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6 p-4 sm:p-6"
    >
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
        🍳 Recipe Ideas
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
        Are you in a good mood to cook today?
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={() => onNext("count")}
          className="bg-linear-to-r from-green-400 to-emerald-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Yes, let's cook! 🍲
        </button>

        <button
          onClick={() => onNext("notmood")}
          className="bg-gray-300 dark:bg-gray-700 dark:text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 shadow-md hover:scale-105 transition-transform duration-300"
        >
          Not really 😞
        </button>
      </div>

      {/* Decorative Emoji */}
      <div className="mt-8 animate-bounce text-4xl sm:text-5xl">👨‍🍳</div>
    </motion.div>
  );
}
