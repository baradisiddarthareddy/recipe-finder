import React, { useState } from "react";
import { motion } from "framer-motion";

export default function IngredientCount({ onNext, setNumIngredients }) {
  const [count, setCount] = useState(1);

  const handleNext = () => {
    if (count === " " || isNaN(count) || count <= 0 || count > 5) {
      alert("Please enter a valid number between 1 and 5!");
      return;
    }
    setNumIngredients(count);
    onNext("entry");
  };

  const handleBack = () => {
    onNext("mood");
  };

  return (
    <motion.div
      key="count"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8 p-4 sm:p-6"
    >
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
        🥕 How many ingredients do you have?
      </h2>

      {/* Input Field */}
      <div className="flex justify-center">
        <input
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-3 w-28 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:text-white transition"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={handleBack}
          className="bg-linear-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          ⬅️ Back
        </button>

        <button
          onClick={handleNext}
          className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Next ➡️
        </button>
      </div>

      {/* Decorative icon */}
      <div className="mt-8 text-4xl animate-bounce">🥗</div>
    </motion.div>
  );
}
