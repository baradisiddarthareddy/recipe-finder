import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function IngredientEntry({
  num,
  setIngredients,
  onNext,
  setRecipes,
}) {
  const [inputs, setInputs] = useState(Array(num).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (value, index) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleBack = () => {
    onNext("count");
  };

  const fetchByIngredients = async (ingredients) => {
    const validIngredients = ingredients.filter((ing) => ing.trim() !== "");
    if (validIngredients.length === 0) {
      alert("Please enter at least one ingredient!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const results = await Promise.all(
        ingredients.map((ing) =>
          axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
            .then((res) => res.data.meals || [])
        )
      );

      const common = results.reduce((a, b) =>
        a.filter((x) => b.some((y) => y.idMeal === x.idMeal))
      );

      if (common.length === 0) {
        setError("No recipes found with those ingredients 😢");
      }

      setRecipes(common);
      setIngredients(ingredients);
      onNext("recipes");
    } catch {
      setError("Error fetching recipes. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="entry"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8 p-4 sm:p-6"
    >
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
        🧂 Enter your ingredients
      </h2>

      {/* Input Fields */}
      <div className="flex flex-col gap-4 items-center">
        {inputs.map((value, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Ingredient ${i + 1}`}
            value={value}
            onChange={(e) => handleChange(e.target.value, i)}
            className="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-3 w-3/4 sm:w-1/2 text-lg font-medium 
                       focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white transition"
          />
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-semibold animate-pulse">{error}</p>
      )}

      {/* Loading or Button */}
      {loading ? (
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
          Loading recipes...
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={handleBack}
            className="bg-linear-to-r from-gray-400 to-gray-500 text-white px-6 py-3 rounded-xl font-semibold 
                       shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            ⬅️ Back
          </button>
          <button
            onClick={() => fetchByIngredients(inputs)}
            className="bg-linear-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold 
                       shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Get Recipe Ideas 🍽️
          </button>
        </div>
      )}

      {/* Decorative icon */}
      <div className="mt-8 text-4xl animate-bounce">🍅</div>
    </motion.div>
  );
}
