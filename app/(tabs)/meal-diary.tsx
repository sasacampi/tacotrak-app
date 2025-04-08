"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import MealSection from "../../components/MealSection";
import FoodSearchModal from "../../components/FoodSearchModal";
import MacroProgressBar from "../../components/MacroProgressBar";
import type { AppNavigationProp } from "../../types/navigation";

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

// Metas diárias
const DAILY_GOALS = {
  calories: 2200,
  carbs: 275, // ~50% das calorias
  protein: 150, // ~27% das calorias
  fat: 55, // ~23% das calorias
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
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calcular totais diários
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

    // Calcular nutrientes com base na quantidade em gramas
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

      // Recalcular totais da refeição
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

      // Recalcular totais da refeição
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

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("pt-BR", options);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);

    // Em um app real, aqui você buscaria os dados do dia selecionado
    // Por enquanto, vamos apenas resetar para o estado inicial
    setMeals(initialMeals);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Diário de Refeições
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => changeDate(-1)}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.dateText, { color: colors.text }]}>
          {isToday(currentDate) ? "Hoje" : ""}, {formatDate(currentDate)}
        </Text>
        <TouchableOpacity onPress={() => changeDate(1)}>
          <Feather name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.summaryCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: colors.text }]}>
          Resumo do Dia
        </Text>

        <View style={styles.calorieProgress}>
          <View style={styles.calorieHeader}>
            <Text style={[styles.calorieValue, { color: colors.primary }]}>
              {dailyTotals.calories}
            </Text>
            <Text style={[styles.calorieLabel, { color: colors.gray }]}>
              / {DAILY_GOALS.calories} kcal
            </Text>
          </View>

          <View
            style={[styles.progressBar, { backgroundColor: colors.border }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${Math.min(
                    100,
                    (dailyTotals.calories / DAILY_GOALS.calories) * 100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.macroContainer}>
          <MacroProgressBar
            label="Carboidratos"
            current={dailyTotals.carbs}
            target={DAILY_GOALS.carbs}
            color="#4CAF50"
          />
          <MacroProgressBar
            label="Proteínas"
            current={dailyTotals.protein}
            target={DAILY_GOALS.protein}
            color="#2196F3"
          />
          <MacroProgressBar
            label="Gorduras"
            current={dailyTotals.fat}
            target={DAILY_GOALS.fat}
            color="#FF9800"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  calorieProgress: {
    marginBottom: 16,
  },
  calorieHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  calorieLabel: {
    fontSize: 16,
    marginLeft: 4,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  macroContainer: {
    marginTop: 8,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default MealDiaryScreen;
