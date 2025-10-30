import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MoodScreen from "./components/MoodScreen";
import IngredientCount from "./components/IngredientCount";
import IngredientEntry from "./components/IngredientEntry";
import RecipeGrid from "./components/RecipeGrid";
import NotInMood from "./components/NotInMood";
import "./App.css";

export default function App() {
  const [step, setStep] = useState("mood");
  const [numIngredients, setNumIngredients] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const restartFlow = () => {
    setStep("mood");
    setIngredients([]);
    setNumIngredients(0);
    setRecipes([]);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-linear-to-br from-purple-200 via-teal-100 to-orange-100 text-gray-900"
      }`}
    >
      
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 px-3 py-2 bg-white/80 dark:bg-gray-700 dark:text-white rounded-full shadow-md hover:scale-105 transition-transform"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

     
      {!darkMode && (
        <>
          <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse" />
          <div className="absolute w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-25 bottom-10 right-10 animate-pulse" />
        </>
      )}

     
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-full max-w-3xl rounded-2xl p-6 shadow-lg backdrop-blur-md transition-all duration-500 ${
          darkMode
            ? "bg-gray-800/70 border border-white-300 shadow-amber-50"
            : "bg-white/80 border border-gray-200"
        }`}
      >
        <AnimatePresence mode="wait">
          {step === "mood" && <MoodScreen onNext={setStep} />}
          {step === "count" && (
            <IngredientCount
              onNext={setStep}
              setNumIngredients={setNumIngredients}
            />
          )}
          {step === "entry" && (
            <IngredientEntry
              num={numIngredients}
              setIngredients={setIngredients}
              onNext={setStep}
              setRecipes={setRecipes}
            />
          )}
          {step === "recipes" && (
            <RecipeGrid recipes={recipes} onRestart={restartFlow} />
          )}
          {step === "notmood" && <NotInMood onRestart={restartFlow} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
