"use client";

import type React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import FoodItem from "./FoodItem";

interface Food {
  id: string;
  name: string;
  calories: number;
  portion: string;
}

interface MealSectionProps {
  title: string;
  foods: Food[];
  totalCalories: number;
  onAddFood: () => void;
  onFoodPress: (food: Food) => void;
}

const MealSection: React.FC<MealSectionProps> = ({
  title,
  foods,
  totalCalories,
  onAddFood,
  onFoodPress,
}) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.header,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.calories, { color: colors.primary }]}>
            {totalCalories} kcal
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={onAddFood}
          >
            <Feather name="plus" size={16} color="#FFF" />
          </TouchableOpacity>
          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.gray}
          />
        </View>
      </TouchableOpacity>

      {expanded && foods.length > 0 && (
        <View style={styles.foodList}>
          {foods.map((food) => (
            <FoodItem
              key={food.id}
              name={food.name}
              calories={food.calories}
              portion={food.portion}
              onPress={() => onFoodPress(food)}
            />
          ))}
        </View>
      )}

      {expanded && foods.length === 0 && (
        <View
          style={[
            styles.emptyState,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.emptyText, { color: colors.gray }]}>
            Nenhum alimento adicionado
          </Text>
          <TouchableOpacity
            style={[styles.emptyButton, { backgroundColor: colors.lightGray }]}
            onPress={onAddFood}
          >
            <Text style={[styles.emptyButtonText, { color: colors.text }]}>
              Adicionar alimento
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  calories: {
    fontSize: 14,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  foodList: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  emptyState: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  emptyText: {
    fontSize: 14,
    marginBottom: 12,
  },
  emptyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default MealSection;
