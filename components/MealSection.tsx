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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={styles.macroSummary}>
          <Text style={[styles.calories, { color: colors.primary }]}>
            {totalCalories} kcal
          </Text>
          <Text style={[styles.macros, { color: colors.gray }]}>
            C: {totalCarbs}g | P: {totalProtein}g | G: {totalFat}g
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
                <Text style={[styles.foodCalories, { color: colors.primary }]}>
                  {food.calories} kcal
                </Text>
                <Text style={[styles.foodMacros, { color: colors.gray }]}>
                  C: {food.carbs}g | P: {food.protein}g | G: {food.fat}g
                </Text>
              </View>
              <Feather
                name="trash-2"
                size={18}
                color={colors.gray}
                style={styles.deleteIcon}
              />
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
        style={[styles.addButton, { borderColor: colors.primary }]}
        onPress={onAddFood}
      >
        <Feather name="plus" size={18} color={colors.primary} />
        <Text style={[styles.addButtonText, { color: colors.primary }]}>
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
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  macroSummary: {
    alignItems: "flex-end",
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
  },
  macros: {
    fontSize: 12,
    marginTop: 2,
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
    fontSize: 16,
    fontWeight: "500",
  },
  foodPortion: {
    fontSize: 14,
    marginTop: 2,
  },
  foodNutrition: {
    alignItems: "flex-end",
    marginRight: 16,
  },
  foodCalories: {
    fontSize: 14,
    fontWeight: "500",
  },
  foodMacros: {
    fontSize: 12,
  },
  deleteIcon: {
    padding: 4,
  },
  emptyState: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    padding: 12,
    marginTop: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MealSection;
