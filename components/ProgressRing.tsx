"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useTheme } from "../app/context/ThemeContext";

interface ProgressRingProps {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  text: string;
  subText?: string;
  color?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size,
  strokeWidth,
  text,
  subText,
  color,
}) => {
  const { colors } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  const actualColor = color || colors.primary;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke={colors.lightGray}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={actualColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
        {subText && (
          <Text style={[styles.subText, { color: colors.gray }]}>
            {subText}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default ProgressRing;
