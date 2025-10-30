import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeModal({ id, onClose }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => setRecipe(res.data.meals[0]));
  }, [id]);

  return (
    <AnimatePresence>
      {recipe ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose} // ✅ Click outside closes modal
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // ✅ Prevent close on inner clicks
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white/80 dark:bg-gray-900/90
                       rounded-3xl shadow-2xl overflow-hidden text-gray-800 dark:text-gray-100
                       border border-white/20 backdrop-blur-xl"
          >
            {/* ✖ Close Button */}
            <button
              onClick={onClose}
              className="absolute -top left-105 z-50 bg-linear-to-r from-red-500 to-pink-600 
                         text-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center 
                         hover:scale-110 transition-transform border-2 border-white/50"
              aria-label="Close"
            >
              ✖
            </button>

            {/* Recipe Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-60 sm:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <h2 className="absolute bottom-4 left-0 w-full text-center text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg">
                {recipe.strMeal}
              </h2>
            </motion.div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[65vh]">
              {/* Category & Area */}
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                <strong>Category:</strong> {recipe.strCategory} &nbsp;|&nbsp;
                <strong>Area:</strong> {recipe.strArea}
              </p>

              {/* Divider Line */}
              <hr className="border-gray-300 dark:border-gray-700 mb-4" />

              {/* Instructions */}
              <div className="text-justify text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {recipe.strInstructions}
              </div>

              {/* YouTube Link */}
              {recipe.strYoutube && (
                <div className="text-center mt-6">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 
                               text-white px-6 py-2 rounded-xl font-semibold shadow-lg
                               hover:scale-105 transition-transform duration-300"
                  >
                    ▶️ Watch Tutorial
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm text-white text-lg z-50">
          Loading recipe details...
        </div>
      )}
    </AnimatePresence>
  );
}
