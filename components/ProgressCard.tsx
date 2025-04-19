"use client";

import type React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../app/context/ThemeContext";
import Svg, { Circle } from "react-native-svg";

interface ProgressCardProps {
  percentage: number;
  calories: number;
  date: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  percentage,
  calories,
  date,
}) => {
  const { colors } = useTheme();

  // Circle progress calculations
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { backgroundColor: "#e950a3" }]}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContent}>
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabel}>Your Progress</Text>
          </View>
          <Text style={styles.percentageText}>{percentage}%</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <View style={styles.circleContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#FFFFFF"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            />
          </Svg>
          <View style={styles.caloriesContainer}>
            <Text style={styles.caloriesValue}>{calories}</Text>
            <Text style={styles.caloriesLabel}>Calories</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  progressLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  percentageText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
    fontFamily: "Poppins-Regular",
    marginTop: 4,
  },
  circleContainer: {
    position: "relative",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  caloriesLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default ProgressCard;
