"use client";

import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

interface MealItem {
  id: string;
  name: string;
  calories: number;
}

interface MealCardProps {
  title: string;
  consumedCalories: number;
  totalCalories: number;
  items: MealItem[];
  onAddItem: () => void;
  onItemPress: (item: MealItem) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  title,
  consumedCalories,
  totalCalories,
  items,
  onAddItem,
  onItemPress,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#f8f9fe", borderColor: "#ebedf8" },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: "#6b6edc" }]}>
            {title.toUpperCase()}
          </Text>
          <Text style={styles.calories}>
            <Text style={{ fontWeight: "600" }}>{consumedCalories}</Text>
            <Text style={{ color: "#9fa0bc" }}> kcal/{totalCalories} kcal</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#e9eaff" }]}
          onPress={onAddItem}
        >
          <Feather name="plus" size={18} color="#6b6edc" />
        </TouchableOpacity>
      </View>

      <View style={styles.itemsContainer}>
        {items.length > 0 ? (
          items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCalories}>{item.calories} cals</Text>
              </View>
              <TouchableOpacity
                style={[styles.itemButton, { backgroundColor: "#e9eaff" }]}
                onPress={() => onItemPress(item)}
              >
                <Feather name="plus" size={14} color="#6b6edc" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum alimento adicionado</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.5,
  },
  calories: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  itemsContainer: {
    marginTop: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf8",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  },
  itemCalories: {
    fontSize: 13,
    color: "#9fa0bc",
    fontFamily: "Poppins-Regular",
  },
  itemButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#9fa0bc",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    paddingVertical: 16,
  },
});

export default MealCard;
