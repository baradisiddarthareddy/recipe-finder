# 🍳 Recipe Ideas App

An **interactive and beautifully animated recipe suggestion web app** built using **React, Vite, Framer Motion, Axios, and Tailwind CSS**.  
This app helps users find new recipes based on available ingredients — or relax and order food when not in the mood to cook.  
It’s fully **responsive**, supports **light/dark themes**, and delivers a **modern, smooth UX**.

---

## 🌈 Features

✅ Mood-based cooking flow – choose whether to cook or order food  
✅ Smart recipe finder powered by **TheMealDB API**  
✅ Smooth UI transitions using **Framer Motion**  
✅ Fully responsive across all devices  
✅ Elegant animated modal for recipe details  
✅ Dark/Light theme toggle support  
✅ Restart flow from any step  

---

## 🧭 App Flow

```mermaid
graph TD;
  A[MoodScreen: Are you in mood to cook?] -->|Yes| B[IngredientCount: Select number of ingredients (1-5)]
  A -->|No| F[NotInMood: Links to Zomato & Swiggy]
  B --> C[IngredientEntry: Enter ingredients]
  C --> D[RecipeGrid: Recipe suggestions from TheMealDB API]
  D --> E[RecipeModal: View recipe details + YouTube link]
  E -->|Restart| A
  F -->|Back to Home| A
