"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import Button from "../../components/Button";
import type { ScreenProps } from "../../types/navigation";

interface UserData {
  gender: "male" | "female";
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
}

interface ActivityLevel {
  id: string;
  label: string;
  description: string;
  factor: number;
}

const TDEECalculatorScreen = ({
  navigation,
}: ScreenProps<"TDEECalculator">) => {
  const { colors } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    gender: "male",
    age: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
  });

  const [tdee, setTdee] = useState(0);
  const [bmr, setBmr] = useState(0);
  const [cuttingCalories, setCuttingCalories] = useState(0);
  const [bulkingCalories, setBulkingCalories] = useState(0);
  const [activityMultiplier, setActivityMultiplier] = useState(1.2);
  const [hasCalculated, setHasCalculated] = useState(false);

  const activityLevels: ActivityLevel[] = [
    {
      id: "sedentary",
      label: "Sedentary",
      description: "Little or no exercise",
      factor: 1.2,
    },
    {
      id: "light",
      label: "Light Activity",
      description: "Exercise 1-3 times/week",
      factor: 1.375,
    },
    {
      id: "moderate",
      label: "Moderate Activity",
      description: "Exercise 4-5 times/week",
      factor: 1.55,
    },
    {
      id: "very",
      label: "Very Active",
      description: "Exercise 6-7 times/week",
      factor: 1.725,
    },
    {
      id: "extreme",
      label: "Extremely Active",
      description: "Exercise & physical job or 2x training",
      factor: 1.9,
    },
  ];

  const updateUserData = (
    key: keyof UserData,
    value: string | "male" | "female"
  ) => {
    if (key === "age" && typeof value === "string") {
      // Limit age to 2 digits
      const limitedValue = value.replace(/\D/g, "").slice(0, 2);
      setUserData({ ...userData, [key]: limitedValue });
    } else if (key === "weight" && typeof value === "string") {
      // Limit weight to 3 digits
      const limitedValue = value.replace(/\D/g, "").slice(0, 3);
      setUserData({ ...userData, [key]: limitedValue });
    } else if (key === "height" && typeof value === "string") {
      // Limit height to 3 digits
      const limitedValue = value.replace(/\D/g, "").slice(0, 3);
      setUserData({ ...userData, [key]: limitedValue });
    } else {
      setUserData({ ...userData, [key]: value });
    }
  };

  // Format number with commas for thousands
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTDEE = (): void => {
    const weight = Number.parseFloat(userData.weight);
    const height = Number.parseFloat(userData.height);
    const age = Number.parseFloat(userData.age);

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
      return;
    }

    // Calculate BMR using Mifflin-St Jeor formula
    let calculatedBmr = 0;
    if (userData.gender === "male") {
      calculatedBmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      calculatedBmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Find the activity factor
    const activityFactor =
      activityLevels.find((level) => level.id === userData.activityLevel)
        ?.factor || 1.2;

    const calculatedTdee = Math.round(calculatedBmr * activityFactor);

    setBmr(Math.round(calculatedBmr));
    setActivityMultiplier(activityFactor);
    setTdee(calculatedTdee);
    setCuttingCalories(Math.round(calculatedTdee * 0.8)); // 20% deficit
    setBulkingCalories(Math.round(calculatedTdee * 1.2)); // 20% surplus

    setHasCalculated(true);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          TDEE Calculator
        </Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gender Selection */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              {
                backgroundColor:
                  userData.gender === "male" ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => updateUserData("gender", "male")}
          >
            <Text
              style={[
                styles.genderButtonText,
                { color: userData.gender === "male" ? "#FFFFFF" : colors.text },
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              {
                backgroundColor:
                  userData.gender === "female" ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => updateUserData("gender", "female")}
          >
            <Text
              style={[
                styles.genderButtonText,
                {
                  color: userData.gender === "female" ? "#FFFFFF" : colors.text,
                },
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>

        {/* Age Input */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>Age</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Years"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.age}
            onChangeText={(text) => updateUserData("age", text)}
          />
        </View>

        {/* Weight Input */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>Weight</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="kg"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.weight}
            onChangeText={(text) => updateUserData("weight", text)}
          />
          <Text style={[styles.inputUnit, { color: colors.gray }]}>kg/lb</Text>
        </View>

        {/* Height Input */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>Height</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="cm"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.height}
            onChangeText={(text) => updateUserData("height", text)}
          />
          <Text style={[styles.inputUnit, { color: colors.gray }]}>cm/ft</Text>
        </View>

        {/* Activity Level */}
        <Text style={[styles.inputLabel, { color: colors.text }]}>
          Activity Level
        </Text>
        <View style={styles.activityContainer}>
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.activityButton,
                {
                  backgroundColor:
                    userData.activityLevel === level.id
                      ? colors.primary
                      : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => updateUserData("activityLevel", level.id)}
            >
              <Text
                style={[
                  styles.activityTitle,
                  {
                    color:
                      userData.activityLevel === level.id
                        ? "#FFFFFF"
                        : colors.text,
                  },
                ]}
              >
                {level.label}
              </Text>
              <Text
                style={[
                  styles.activityDescription,
                  {
                    color:
                      userData.activityLevel === level.id
                        ? "#FFFFFF"
                        : colors.gray,
                  },
                ]}
              >
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TDEE Results */}
        {hasCalculated && (
          <View
            style={[
              styles.resultsContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.resultsTitle, { color: colors.text }]}>
              Your Daily Calories
            </Text>

            <Text style={[styles.tdeeValue, { color: colors.text }]}>
              {formatNumber(tdee)}
            </Text>
            <Text style={[styles.tdeeSubtitle, { color: colors.gray }]}>
              Maintenance Calories
            </Text>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <View style={styles.optionsContainer}>
              <View style={styles.optionColumn}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>
                  Weight Loss (-20%)
                </Text>
                <Text style={[styles.optionValue, { color: colors.primary }]}>
                  {formatNumber(cuttingCalories)} cal
                </Text>
              </View>

              <View
                style={[
                  styles.verticalDivider,
                  { backgroundColor: colors.border },
                ]}
              />

              <View style={styles.optionColumn}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>
                  Weight Gain (+20%)
                </Text>
                <Text style={[styles.optionValue, { color: colors.primary }]}>
                  {formatNumber(bulkingCalories)} cal
                </Text>
              </View>
            </View>

            <View
              style={[styles.additionalInfo, { borderTopColor: colors.border }]}
            >
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.gray }]}>
                  BMR:
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {bmr} calories/day
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.gray }]}>
                  Activity Multiplier:
                </Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  x{activityMultiplier}
                </Text>
              </View>
            </View>
          </View>
        )}

        <Button
          title="Calculate TDEE"
          onPress={calculateTDEE}
          style={styles.calculateButton}
        />
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  inputUnit: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  resultsContainer: {
    alignItems: "center",
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins-SemiBold",
  },
  tdeeValue: {
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  tdeeSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  optionColumn: {
    flex: 1,
    alignItems: "center",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    marginHorizontal: 16,
  },
  optionLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  optionValue: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  additionalInfo: {
    width: "100%",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  calculateButton: {
    height: 56,
  },
});

export default TDEECalculatorScreen;
