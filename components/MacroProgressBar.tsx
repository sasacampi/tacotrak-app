"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

type MacroProgressBarProps = {
  label: string;
  current: number;
  target: number;
  color: string;
};

const MacroProgressBar: React.FC<MacroProgressBarProps> = ({
  label,
  current,
  target,
  color,
}) => {
  const { colors } = useTheme();
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.values, { color: colors.text }]}>
          {current}/{target}g
        </Text>
      </View>
      <View
        style={[styles.progressBackground, { backgroundColor: colors.border }]}
      >
        <View
          style={[
            styles.progressFill,
            { backgroundColor: color, width: `${progress * 100}%` },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
  values: {
    fontSize: 14,
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});

export default MacroProgressBar;
