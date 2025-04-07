"use client";

import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

interface FoodItemProps {
  name: string;
  calories: number;
  portion: string;
  onPress: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({
  name,
  calories,
  portion,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.portion, { color: colors.gray }]}>{portion}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.calories, { color: colors.primary }]}>
          {calories} kcal
        </Text>
        <Feather name="chevron-right" size={20} color={colors.gray} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  portion: {
    fontSize: 14,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  calories: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FoodItem;
