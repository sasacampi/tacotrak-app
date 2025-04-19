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
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import ProgressGoalCard from "../../components/ProgressGoalCard";

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
    bgColor = "rgba(240, 240, 240, 0.3)",
    useGradient = false
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {useGradient && (
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity="1" />
              <Stop offset="100%" stopColor={`${color}80`} stopOpacity="1" />
            </LinearGradient>
          </Defs>
        )}
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
          stroke={useGradient ? "url(#grad)" : color}
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
    <SafeAreaView style={[styles.container, { backgroundColor: "#F8F8F8" }]}>
      {/* Header with gradient background */}
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
        style={styles.scrollView}
      >
        {/* Summary section */}
        <View style={styles.summarySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Today's Summary
          </Text>

          {/* Nutrition Widget with shadow and improved styling */}
          <View
            style={[
              styles.nutritionWidget,
              {
                backgroundColor: "#FFFFFF",
                borderColor: "transparent",
              },
            ]}
          >
            <View style={styles.caloriesContainer}>
              <View style={styles.caloriesRing}>
                {createCircularProgress(
                  120,
                  12,
                  nutritionData.calories.current /
                    nutritionData.calories.target,
                  colors.primary,
                  "rgba(240, 240, 240, 0.3)",
                  true
                )}
                <View style={styles.caloriesContent}>
                  <Feather name="zap" size={16} color={colors.primary} />
                  <Text
                    style={[styles.caloriesValue, { color: colors.primary }]}
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
                    nutritionData.protein.current /
                      nutritionData.protein.target,
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
        </View>

        {/* Goals section */}
        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weight Goals
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: "#FFFFFF",
                borderColor: "transparent",
                padding: 16,
              },
            ]}
          >
            <View style={styles.weightGridContainer}>
              <View style={styles.weightGridItem}>
                <Text style={[styles.weightGridLabel, { color: "#FF9800" }]}>
                  Weight Loss
                </Text>
                <Text style={[styles.weightGridValue, { color: colors.text }]}>
                  {userData.currentWeight} kg
                </Text>
              </View>

              <View style={styles.weightGridItem}>
                <Text style={[styles.weightGridLabel, { color: "#e950a3" }]}>
                  Current Wt
                </Text>
                <Text style={[styles.weightGridValue, { color: colors.text }]}>
                  {userData.currentWeight + 7} kg
                </Text>
              </View>

              <View style={styles.weightGridItem}>
                <Text style={[styles.weightGridLabel, { color: "#2196F3" }]}>
                  Avg Wt
                </Text>
                <Text style={[styles.weightGridValue, { color: colors.text }]}>
                  {userData.currentWeight - 3.7} kg
                </Text>
              </View>

              <View style={styles.weightGridItem}>
                <Text style={[styles.weightGridLabel, { color: "#FFC107" }]}>
                  Wt Track
                </Text>
                <Text style={[styles.weightGridValue, { color: colors.text }]}>
                  {userData.goalWeight + 10.9} kg
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Calories section */}
        <View style={styles.caloriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Calories Tracking
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: "transparent",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                padding: 20,
              },
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
                <View style={styles.caloriesHeaderContent}>
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

              <TouchableOpacity
                style={[
                  styles.periodSelector,
                  { backgroundColor: colors.lightGray },
                ]}
              >
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
                          borderRadius: 4,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.barSegment,
                        {
                          backgroundColor: "#FFA726",
                          height: (day.protein / maxCalories) * 850,
                          borderRadius: 4,
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.barSegment,
                        {
                          backgroundColor: "#4CAF50",
                          height: (day.calories / maxCalories) * 65,
                          borderRadius: 4,
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
        </View>

        {/* Metrics section */}
        <View style={styles.metricsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Health Metrics
          </Text>

          <View style={styles.metricsGrid}>
            <View style={styles.metricGridItem}>
              <ProgressGoalCard
                icon={<Feather name="heart" size={20} color="#F44336" />}
                iconBgColor="#F44336"
                title="Frequência Cardíaca"
                subtitle={`${userData.heartRate} bpm`}
                onPress={() => {}}
                style={styles.metricCard}
              />
            </View>

            <View style={styles.metricGridItem}>
              <ProgressGoalCard
                icon={<Feather name="droplet" size={20} color="#2196F3" />}
                iconBgColor="#2196F3"
                title="Água"
                subtitle={`${userData.water} ml`}
                onPress={() => {}}
                style={styles.metricCard}
              />
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricGridItem}>
              <ProgressGoalCard
                icon={<Feather name="activity" size={20} color="#4CAF50" />}
                iconBgColor="#4CAF50"
                title="Passos"
                subtitle={`${userData.steps} passos`}
                onPress={() => {}}
                style={styles.metricCard}
              />
            </View>

            <View style={styles.metricGridItem}>
              <ProgressGoalCard
                icon={<Feather name="moon" size={20} color="#9C27B0" />}
                iconBgColor="#9C27B0"
                title="Sono"
                subtitle={userData.sleep}
                onPress={() => {}}
                style={styles.metricCard}
              />
            </View>
          </View>
        </View>

        {/* Goals section */}
        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Fitness Goals
          </Text>

          <ProgressGoalCard
            icon={<Feather name="award" size={20} color="#F5A623" />}
            iconBgColor="#F5A623"
            title="Gaining muscle"
            subtitle="Muscle: 87.9%"
            timeframe="Last week"
            onPress={() => {}}
            style={{
              ...styles.enhancedCard,
              backgroundColor: "#FFFFFF",
              borderColor: "transparent",
              marginBottom: 16,
            }}
          />

          <ProgressGoalCard
            icon={<Feather name="activity" size={20} color="#FF5252" />}
            iconBgColor="#FF5252"
            title="Weight loss"
            subtitle="5.00 km"
            timeframe="Last week"
            onPress={() => {}}
            style={{
              ...styles.enhancedCard,
              backgroundColor: "#FFFFFF",
              borderColor: "transparent",
              marginBottom: 16,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  summarySection: {
    marginBottom: 24,
  },
  goalsSection: {
    marginBottom: 24,
  },
  caloriesSection: {
    marginBottom: 24,
  },
  metricsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
    marginLeft: 4,
  },
  // Nutrition Widget Styles
  nutritionWidget: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 16,
    marginBottom: 8,
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
  // Card styles
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  weightStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weightStat: {
    alignItems: "center",
    flex: 1,
  },
  weightStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
  caloriesHeaderContent: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    marginBottom: 1,
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: "Poppins-Regular",
  },
  // Metrics grid
  metricsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricGridItem: {
    width: "48%",
  },
  metricCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderColor: "transparent",
  },
  enhancedCard: {
    backgroundColor: "#f9f6ee",
    borderColor: "transparent",
    marginBottom: 16,
  },
  weightGridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  weightGridItem: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  weightGridLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 4,
  },
  weightGridValue: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});

export default DashboardScreen;
