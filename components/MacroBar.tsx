"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  unit?: string;
}

const MacroBar: React.FC<MacroBarProps> = ({
  label,
  current,
  target,
  color,
  unit = "g",
}) => {
  const { colors } = useTheme();
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {current}/{target}
          {unit}
        </Text>
      </View>
      <View
        style={[styles.barBackground, { backgroundColor: colors.lightGray }]}
      >
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: color,
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
  },
  barBackground: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
});

export default MacroBar;
