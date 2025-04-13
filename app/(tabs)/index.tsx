"use client";
import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import type { TabScreenProps } from "../../types/navigation";
import Svg, { Circle } from "react-native-svg";

const weeklyData = [
  { day: "Mon", calories: 1800, protein: 90, fat: 60 },
  { day: "Tue", calories: 2100, protein: 110, fat: 70 },
  { day: "Wed", calories: 2300, protein: 120, fat: 75 },
  { day: "Thu", calories: 1900, protein: 95, fat: 65 },
  { day: "Fri", calories: 2000, protein: 100, fat: 68 },
  { day: "Sat", calories: 2200, protein: 115, fat: 72 },
  { day: "Sun", calories: 2100, protein: 105, fat: 70 },
];

const DashboardScreen = ({ navigation }: TabScreenProps<"Dashboard">) => {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("Semanal");

  const meals = {
    breakfast: { totalCalories: 450 },
    lunch: { totalCalories: 750 },
    dinner: { totalCalories: 650 },
    snacks: { totalCalories: 350 },
  };
  const totalCalories = 2200;

  const nutritionData = {
    calories: {
      current: 1650,
      target: 2000,
      color: "#4361EE",
    },
    carbs: {
      current: 120,
      target: 250,
      color: "#70B01B",
    },
    protein: {
      current: 101,
      target: 120,
      color: "#FFA726",
    },
    fat: {
      current: 35,
      target: 40,
      color: "#C8B6E2",
    },
  };

  const userData = {
    currentWeight: 60.0,
    weightChange: -0.45,
    percentageChange: 56,
    goalWeight: 52.0,
    heartRate: 97,
    water: 1200,
    steps: 11932,
    sleep: "7h 23m",
  };

  const maxCalories = Math.max(...weeklyData.map((day) => day.calories));

  const createCircularProgress = (
    size: number,
    strokeWidth: number,
    progress: number,
    color: string,
    bgColor = "#F0F0F0"
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Dashboard
        </Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.nutritionWidget,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.caloriesContainer}>
            <View style={styles.caloriesRing}>
              {createCircularProgress(
                120,
                12,
                nutritionData.calories.current / nutritionData.calories.target,
                nutritionData.calories.color
              )}
              <View style={styles.caloriesContent}>
                <Feather
                  name="zap"
                  size={16}
                  color={nutritionData.calories.color}
                />
                <Text
                  style={[
                    styles.caloriesValue,
                    { color: nutritionData.calories.color },
                  ]}
                >
                  {nutritionData.calories.current}
                </Text>
                <Text style={[styles.caloriesTarget, { color: colors.gray }]}>
                  /{nutritionData.calories.target} kcal
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <View style={styles.macroRing}>
                {createCircularProgress(
                  50,
                  6,
                  nutritionData.carbs.current / nutritionData.carbs.target,
                  nutritionData.carbs.color
                )}
                <Text style={[styles.macroValue, { color: colors.text }]}>
                  {nutritionData.carbs.current}g
                </Text>
              </View>
              <Text style={[styles.macroLabel, { color: colors.gray }]}>
                Carbs
              </Text>
            </View>

            <View style={styles.macroItem}>
              <View style={styles.macroRing}>
                {createCircularProgress(
                  50,
                  6,
                  nutritionData.protein.current / nutritionData.protein.target,
                  nutritionData.protein.color
                )}
                <Text style={[styles.macroValue, { color: colors.text }]}>
                  {nutritionData.protein.current}g
                </Text>
              </View>
              <Text style={[styles.macroLabel, { color: colors.gray }]}>
                Proteína
              </Text>
            </View>

            <View style={styles.macroItem}>
              <View style={styles.macroRing}>
                {createCircularProgress(
                  50,
                  6,
                  nutritionData.fat.current / nutritionData.fat.target,
                  nutritionData.fat.color
                )}
                <Text style={[styles.macroValue, { color: colors.text }]}>
                  {nutritionData.fat.current}g
                </Text>
              </View>
              <Text style={[styles.macroLabel, { color: colors.gray }]}>
                Gordura
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Meus objetivos
            </Text>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.weightStats}>
            <View style={styles.weightStat}>
              <Text style={[styles.weightValue, { color: colors.text }]}>
                {userData.currentWeight} kg
              </Text>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Peso atual
              </Text>
            </View>

            <View style={styles.weightStat}>
              <Text style={[styles.weightChange, { color: colors.primary }]}>
                {userData.weightChange} kg
              </Text>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Peso perdido
              </Text>
            </View>

            <View style={styles.weightStat}>
              <Text style={[styles.weightChange, { color: colors.primary }]}>
                {userData.percentageChange} kg
              </Text>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Objetivo
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={{ position: "relative", width: "100%" }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                padding: 10,
              }}
            >
              <Feather name="more-horizontal" size={20} color={colors.gray} />
            </TouchableOpacity>

            <View style={styles.cardHeader}>
              <View style={{}}>
                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color: colors.text,
                      fontWeight: "bold",
                      fontSize: 18,
                      padding: 0,
                    },
                  ]}
                >
                  Calorias
                </Text>
                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color: colors.text,
                      fontSize: 24,
                      marginTop: 4,
                      padding: 0,
                    },
                  ]}
                >
                  11930
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text
                    style={[
                      styles.cardTitle,
                      {
                        color: "#B0B0B0",
                        fontSize: 13,
                        marginTop: 4,
                        padding: 0,
                      },
                    ]}
                  >
                    Média diária: 1650
                  </Text>
                  <Text
                    style={[
                      styles.cardTitle,
                      {
                        color: "#B0B0B0",
                        fontSize: 13,
                        marginTop: 4,
                        padding: 0,
                      },
                    ]}
                  >
                    Objetivo: 1650
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Café da manhã
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#FFA726" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Almoço
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#BA68C8" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Jantar
              </Text>
            </View>

            <TouchableOpacity style={styles.periodSelector}>
              <Text style={[styles.smallPeriodText, { color: colors.gray }]}>
                {selectedPeriod}
              </Text>
              <Feather name="chevron-down" size={12} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#BA68C8",
                        height: (day.fat / maxCalories) * 250,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#FFA726",
                        height: (day.protein / maxCalories) * 850,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#4CAF50",
                        height: (day.calories / maxCalories) * 65,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.dayLabel, { color: colors.gray }]}>
                  {day.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.metricHeader}>
                <View
                  style={[styles.metricIcon, { backgroundColor: "#FFCDD2" }]}
                >
                  <Feather name="heart" size={16} color="#F44336" />
                </View>
                <Text style={[styles.metricTitle, { color: colors.text }]}>
                  Frequência{"\n"}Cardíaca
                </Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {userData.heartRate}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.gray }]}>
                bpm
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.metricHeader}>
                <View
                  style={[styles.metricIcon, { backgroundColor: "#BBDEFB" }]}
                >
                  <Feather name="droplet" size={16} color="#2196F3" />
                </View>
                <Text style={[styles.metricTitle, { color: colors.text }]}>
                  Água
                </Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {userData.water}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.gray }]}>
                ml
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.metricHeader}>
                <View
                  style={[styles.metricIcon, { backgroundColor: "#E8F5E9" }]}
                >
                  <Feather name="activity" size={16} color="#4CAF50" />
                </View>
                <Text style={[styles.metricTitle, { color: colors.text }]}>
                  Passos
                </Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {userData.steps}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.gray }]}>
                passos
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.metricHeader}>
                <View
                  style={[styles.metricIcon, { backgroundColor: "#E1BEE7" }]}
                >
                  <Feather name="moon" size={16} color="#9C27B0" />
                </View>
                <Text style={[styles.metricTitle, { color: colors.text }]}>
                  Sono
                </Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color={colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {userData.sleep}
              </Text>
              <Text style={[styles.metricUnit, { color: colors.gray }]}>
                horas
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  // Nutrition Widget Styles
  nutritionWidget: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    alignItems: "center",
  },
  caloriesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesRing: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  caloriesTarget: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  macrosContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  macroRing: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  macroValue: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  macroLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  // Original styles
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  weightStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weightStat: {
    alignItems: "flex-start",
  },
  weightValue: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 4,
  },
  weightChange: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 4,
  },
  weightLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  periodText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginRight: 4,
  },
  smallPeriodText: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    marginRight: 4,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
  },
  barContainer: {
    width: 24,
    height: 120,
    justifyContent: "flex-end",
  },
  barSegment: {
    width: "100%",
    borderRadius: 2,
    marginBottom: 1,
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: "Poppins-Regular",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  metricTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  metricValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  metricUnit: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
});

export default DashboardScreen;
