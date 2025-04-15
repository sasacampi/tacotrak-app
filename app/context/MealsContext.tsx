"use client";

import type React from "react";
import { createContext, useState, useContext } from "react";

export type FoodItem = {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  portion: string;
  quantity: number;
};

export type Meal = {
  title: string;
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  foods: FoodItem[];
};

export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export type Meals = Record<MealType, Meal>;

interface MealsContextType {
  meals: Meals;
  addFood: (mealType: MealType, food: FoodItem) => void;
  removeFood: (mealType: MealType, foodId: string) => void;
  resetMeals: () => void;
}

const initialMeals: Meals = {
  breakfast: {
    title: "Café da Manhã",
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    foods: [],
  },
  lunch: {
    title: "Almoço",
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    foods: [],
  },
  dinner: {
    title: "Jantar",
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    foods: [],
  },
  snacks: {
    title: "Lanches",
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    foods: [],
  },
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export const MealsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [meals, setMeals] = useState<Meals>(initialMeals);

  const addFood = (mealType: MealType, food: FoodItem) => {
    setMeals((prevMeals) => {
      const updatedFoods = [...prevMeals[mealType].foods, food];

      const mealTotals = updatedFoods.reduce(
        (total, item) => {
          return {
            calories: total.calories + item.calories,
            carbs: total.carbs + item.carbs,
            protein: total.protein + item.protein,
            fat: total.fat + item.fat,
          };
        },
        { calories: 0, carbs: 0, protein: 0, fat: 0 }
      );

      return {
        ...prevMeals,
        [mealType]: {
          ...prevMeals[mealType],
          foods: updatedFoods,
          totalCalories: mealTotals.calories,
          totalCarbs: mealTotals.carbs,
          totalProtein: mealTotals.protein,
          totalFat: mealTotals.fat,
        },
      };
    });
  };

  const removeFood = (mealType: MealType, foodId: string) => {
    setMeals((prevMeals) => {
      const updatedFoods = prevMeals[mealType].foods.filter(
        (food) => food.id !== foodId
      );

      const mealTotals = updatedFoods.reduce(
        (total, item) => {
          return {
            calories: total.calories + item.calories,
            carbs: total.carbs + item.carbs,
            protein: total.protein + item.protein,
            fat: total.fat + item.fat,
          };
        },
        { calories: 0, carbs: 0, protein: 0, fat: 0 }
      );

      return {
        ...prevMeals,
        [mealType]: {
          ...prevMeals[mealType],
          foods: updatedFoods,
          totalCalories: mealTotals.calories,
          totalCarbs: mealTotals.carbs,
          totalProtein: mealTotals.protein,
          totalFat: mealTotals.fat,
        },
      };
    });
  };

  const resetMeals = () => {
    setMeals(initialMeals);
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        addFood,
        removeFood,
        resetMeals,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (context === undefined) {
    throw new Error("useMeals must be used within a MealsProvider");
  }
  return context;
};

export default MealsProvider;
