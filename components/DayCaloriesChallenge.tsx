"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

interface DayCaloriesChallengeProps {
  completedDays: number[];
}

const DayCaloriesChallenge: React.FC<DayCaloriesChallengeProps> = ({
  completedDays,
}) => {
  const { colors } = useTheme();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Day Calories Challenge
      </Text>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isCompleted = completedDays.includes(index);
          return (
            <View key={day} style={styles.dayItem}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: isCompleted
                      ? colors.primary
                      : "transparent",
                    borderColor: isCompleted ? colors.primary : colors.border,
                  },
                ]}
              >
                {isCompleted && (
                  <Feather name="check" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={[styles.dayText, { color: colors.text }]}>
                {day}
              </Text>
            </View>
          );
        })}
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
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "Poppins-SemiBold",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayItem: {
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dayText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
});

export default DayCaloriesChallenge;
