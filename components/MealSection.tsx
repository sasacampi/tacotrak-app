"use client";

import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

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

type MealSectionProps = {
  title: string;
  foods: FoodItem[];
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  onAddFood: () => void;
  onFoodPress: (food: FoodItem) => void;
};

const MealSection: React.FC<MealSectionProps> = ({
  title,
  foods,
  totalCalories,
  totalCarbs,
  totalProtein,
  totalFat,
  onAddFood,
  onFoodPress,
}) => {
  const { colors } = useTheme();

  // Get meal icon based on title
  const getMealIcon = () => {
    switch (title) {
      case "Café da Manhã":
        return "coffee";
      case "Almoço":
        return "sun";
      case "Jantar":
        return "moon";
      case "Lanches":
        return "pie-chart";
      default:
        return "circle";
    }
  };

  const getMealColor = () => {
    switch (title) {
      case "Café da Manhã":
        return "#007AFF";
      case "Almoço":
        return "#007AFF";
      case "Jantar":
        return "#007AFF";
      case "Lanches":
        return "#007AFF";
      default:
        return colors.primary;
    }
  };

  const mealColor = getMealColor();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: mealColor + "20" },
            ]}
          >
            <Feather name={getMealIcon()} size={16} color={mealColor} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
        <View style={styles.macroSummary}>
          <Text style={[styles.calories, { color: mealColor }]}>
            {totalCalories} kcal
          </Text>
        </View>
      </View>

      <View style={styles.foodList}>
        {foods.length > 0 ? (
          foods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={[styles.foodItem, { borderBottomColor: colors.border }]}
              onPress={() => onFoodPress(food)}
            >
              <View style={styles.foodInfo}>
                <Text style={[styles.foodName, { color: colors.text }]}>
                  {food.name}
                </Text>
                <Text style={[styles.foodPortion, { color: colors.gray }]}>
                  {food.quantity}g ({food.portion})
                </Text>
              </View>
              <View style={styles.foodNutrition}>
                <Text style={[styles.foodCalories, { color: mealColor }]}>
                  {food.calories} kcal
                </Text>
                <Text style={[styles.foodMacros, { color: colors.gray }]}>
                  C: {food.carbs}g | P: {food.protein}g | G: {food.fat}g
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onFoodPress(food)}
              >
                <Feather name="trash-2" size={18} color={colors.gray} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.gray }]}>
              Nenhum alimento adicionado
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: mealColor + "10", borderColor: mealColor + "30" },
        ]}
        onPress={onAddFood}
      >
        <Feather name="plus" size={18} color={mealColor} />
        <Text style={[styles.addButtonText, { color: mealColor }]}>
          Adicionar Alimento
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  macroSummary: {
    alignItems: "flex-end",
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  macros: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  foodList: {
    paddingHorizontal: 16,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  foodPortion: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  foodNutrition: {
    alignItems: "flex-end",
    marginRight: 16,
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  foodMacros: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    padding: 12,
    marginTop: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
});

export default MealSection;
