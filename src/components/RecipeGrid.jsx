import React, { useState } from "react";
import RecipeModal from "./RecipeModal";
import { motion } from "framer-motion";

export default function RecipeGrid({ recipes, onRestart }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div
      key="recipes"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6 p-4 sm:p-6"
    >
      {/* Title */}
      <h2 className="text-3xl font-extrabold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        🍽️ Recipe Suggestions
      </h2>
      <h3 className="text-2xl font-extrabold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
        Click on Recipe card to get more details{" "}
      </h3>

      {/* No Results */}
      {recipes.length === 0 ? (
        <p className="text-lg text-gray-500 dark:text-gray-300">
          No recipes found. Try again!
        </p>
      ) : (
        /* Recipe Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {recipes.map((r) => (
            <motion.div
              key={r.idMeal}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(r.idMeal)}
              className="cursor-pointer bg-linear-to-br from-gray-100 via-white to-gray-200 
                         dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                         rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={r.strMealThumb}
                alt={r.strMeal}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <h3 className="mt-3 mb-4 font-semibold text-lg text-gray-800 dark:text-gray-200">
                {r.strMeal}
              </h3>
            </motion.div>
          ))}
        </div>
      )}

      {/* Restart Button */}
      <div className="mt-8">
        <button
          onClick={onRestart}
          className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl 
                     font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          🔁 Back to Home
        </button>
      </div>

      {/* Recipe Modal */}
      {selected && (
        <RecipeModal id={selected} onClose={() => setSelected(null)} />
      )}
    </motion.div>
  );
}
