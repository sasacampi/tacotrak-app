"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

interface MacroNutrientSummaryProps {
  carbs: {
    current: number;
    target: number;
  };
  protein: {
    current: number;
    target: number;
  };
  fat: {
    current: number;
    target: number;
  };
}

const MacroNutrientSummary: React.FC<MacroNutrientSummaryProps> = ({
  carbs,
  protein,
  fat,
}) => {
  const { colors } = useTheme();

  const renderMacroItem = (
    label: string,
    current: number,
    target: number,
    color: string,
    isMiddle = false
  ) => {
    const progress = Math.min(current / target, 1) * 100;

    return (
      <View style={[styles.macroItem, isMiddle && styles.middleMacro]}>
        <View style={styles.macroHeader}>
          <Text style={[styles.macroLabel, { color: colors.text }]}>
            {label}
          </Text>
          <Text style={[styles.macroValues, { color: "#A0A0A0" }]}>
            {current} / {target}g
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarBackground,
              { backgroundColor: "#F0F0F0" },
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  backgroundColor: color,
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.macrosContainer}>
        {renderMacroItem(
          "Carboidratos",
          carbs.current,
          carbs.target,
          "#70B01B"
        )}
        {renderMacroItem(
          "Proteína",
          protein.current,
          protein.target,
          "#FFA726",
          true
        )}
        {renderMacroItem("Gordura", fat.current, fat.target, "#C8B6E2")}
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
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroItem: {
    flex: 1,
  },
  middleMacro: {
    marginHorizontal: 12,
  },
  macroHeader: {
    flexDirection: "column",
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  macroValues: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  progressBarContainer: {
    width: "100%",
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});

export default MacroNutrientSummary;
