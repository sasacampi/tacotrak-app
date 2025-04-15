"use client";

import type React from "react";
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import MealSection from "../../components/MealSection";
import FoodSearchModal from "../../components/FoodSearchModal";
import type { AppNavigationProp } from "../../types/navigation";
import MacroNutrientSummary from "../../components/MacroNutrientSummary";
import DateSelector from "../../components/DateSelector";
import ProgressCard from "../../components/ProgressCard";

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  portion: string;
  quantity: number;
};

type Meal = {
  title: string;
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  foods: FoodItem[];
};

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

type MockMeals = Record<MealType, Meal>;

type MealDiaryScreenProps = {
  navigation: AppNavigationProp<"MealDiary">;
};

const DAILY_GOALS = {
  calories: 2200,
  carbs: 359,
  protein: 143,
  fat: 359,
};

const initialMeals: MockMeals = {
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

const MealDiaryScreen: React.FC<MealDiaryScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [meals, setMeals] = useState<MockMeals>(initialMeals);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const demoMacros = {
    carbs: { current: 281, target: 359 },
    protein: { current: 20, target: 143 },
    fat: { current: 169, target: 359 },
  };

  const dailyTotals = Object.values(meals).reduce(
    (totals, meal) => {
      return {
        calories: totals.calories + meal.totalCalories,
        carbs: totals.carbs + meal.totalCarbs,
        protein: totals.protein + meal.totalProtein,
        fat: totals.fat + meal.totalFat,
      };
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  const handleAddFoodPress = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setIsModalVisible(true);
  };

  const handleFoodSelect = (food: any, grams: number) => {
    if (!selectedMealType) return;

    const ratio = grams / food.portionWeight;
    const calculatedFood: FoodItem = {
      id: `${food.id}-${Date.now()}`,
      name: food.name,
      calories: Math.round(food.calories * ratio),
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      protein: Math.round(food.protein * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
      portion: food.portion,
      quantity: grams,
    };

    setMeals((prevMeals) => {
      const updatedFoods = [
        ...prevMeals[selectedMealType].foods,
        calculatedFood,
      ];

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
        [selectedMealType]: {
          ...prevMeals[selectedMealType],
          foods: updatedFoods,
          totalCalories: mealTotals.calories,
          totalCarbs: mealTotals.carbs,
          totalProtein: mealTotals.protein,
          totalFat: mealTotals.fat,
        },
      };
    });

    setIsModalVisible(false);
  };

  const handleRemoveFood = (mealType: MealType, foodId: string) => {
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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setMeals(initialMeals);
  };

  const formatProgressDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DateSelector
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />

        <ProgressCard
          percentage={92}
          calories={1480}
          date={formatProgressDate(selectedDate)}
        />

        <MacroNutrientSummary
          carbs={demoMacros.carbs}
          protein={demoMacros.protein}
          fat={demoMacros.fat}
        />

        {(Object.keys(meals) as MealType[]).map((mealType) => (
          <MealSection
            key={mealType}
            title={meals[mealType].title}
            foods={meals[mealType].foods}
            totalCalories={meals[mealType].totalCalories}
            totalCarbs={meals[mealType].totalCarbs}
            totalProtein={meals[mealType].totalProtein}
            totalFat={meals[mealType].totalFat}
            onAddFood={() => handleAddFoodPress(mealType)}
            onFoodPress={(food) => handleRemoveFood(mealType, food.id)}
          />
        ))}
      </ScrollView>

      <FoodSearchModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectFood={handleFoodSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default MealDiaryScreen;
