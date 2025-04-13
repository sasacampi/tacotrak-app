"use client";
import React, { useState } from "react";

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

// Mock data for the weekly progress chart
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
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  // Dados estáticos para as refeições
  const meals = {
    breakfast: { totalCalories: 450 },
    lunch: { totalCalories: 750 },
    dinner: { totalCalories: 650 },
    snacks: { totalCalories: 350 },
  };
  const totalCalories = 2200;

  // Mock user data
  const userData = {
    currentWeight: 56.0,
    weightChange: -0.45,
    percentageChange: -0.5,
    goalWeight: 52.0,
    heartRate: 97,
    water: 1200,
    steps: 8432,
    sleep: "7h 23m",
  };

  // Calculate the maximum value for scaling the chart bars
  const maxCalories = Math.max(...weeklyData.map((day) => day.calories));

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
        {/* Weight Goal Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Losing Weight Goal
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
                Goal Weight
              </Text>
            </View>

            <View style={styles.weightStat}>
              <Text style={[styles.weightChange, { color: colors.primary }]}>
                {userData.weightChange} kg
              </Text>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Goal Rate
              </Text>
            </View>

            <View style={styles.weightStat}>
              <Text style={[styles.weightChange, { color: colors.primary }]}>
                {userData.percentageChange} %
              </Text>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Goal Rate
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Your Progress
        </Text>

        {/* Coached Program Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Coached Program
            </Text>
            <TouchableOpacity>
              <Feather name="more-horizontal" size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Calories
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#FFA726" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Protein
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#BA68C8" }]}
              />
              <Text style={[styles.legendText, { color: colors.gray }]}>
                Fat
              </Text>
            </View>

            <TouchableOpacity style={styles.periodSelector}>
              <Text style={[styles.periodText, { color: colors.text }]}>
                {selectedPeriod}
              </Text>
              <Feather name="chevron-down" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  {/* Fat bar */}
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#BA68C8",
                        height: (day.fat / maxCalories) * 120,
                      },
                    ]}
                  />
                  {/* Protein bar */}
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#FFA726",
                        height: (day.protein / maxCalories) * 120,
                      },
                    ]}
                  />
                  {/* Calories bar */}
                  <View
                    style={[
                      styles.barSegment,
                      {
                        backgroundColor: "#4CAF50",
                        height: (day.calories / maxCalories) * 120,
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

        {/* Health Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Heart Rate Card */}
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
                  Heart Rate
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

          {/* Water Card */}
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
                  Water
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

        {/* Activity Metrics Row */}
        <View style={styles.metricsRow}>
          {/* Steps Card */}
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
                  Walk Steps
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
                steps
              </Text>
            </View>
          </View>

          {/* Sleep Card */}
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
                  Sleep
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
                hours
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
  },
  periodText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
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
