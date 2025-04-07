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
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import type { ScreenProps } from "../../types/navigation";

type UserData = {
  age: string;
  gender: "masculino" | "feminino";
  weight: string;
  height: string;
  activityLevel: "sedentario" | "leve" | "moderado" | "muito" | "extremo";
  goal: "perda" | "manutenção" | "ganho";
  adjustmentPercentage: number;
};

type ActivityLevel = {
  label: string;
  factor: number;
};

type ActivityLevels = {
  sedentario: ActivityLevel;
  leve: ActivityLevel;
  moderado: ActivityLevel;
  muito: ActivityLevel;
  extremo: ActivityLevel;
};

const TDEECalculatorScreen = ({ navigation }: ScreenProps) => {
  const { colors } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    age: "30",
    gender: "masculino",
    weight: "70",
    height: "170",
    activityLevel: "moderado",
    goal: "manutenção",
    adjustmentPercentage: 0,
  });

  const activityLevels: ActivityLevels = {
    sedentario: { label: "Sedentário", factor: 1.2 },
    leve: { label: "Levemente ativo", factor: 1.375 },
    moderado: { label: "Moderadamente ativo", factor: 1.55 },
    muito: { label: "Muito ativo", factor: 1.725 },
    extremo: { label: "Extremamente ativo", factor: 1.9 },
  };

  const updateUserData = <K extends keyof UserData>(
    key: K,
    value: UserData[K]
  ) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate TDEE using Mifflin-St Jeor formula
  const calculateTDEE = (): number => {
    const weight = Number.parseFloat(userData.weight);
    const height = Number.parseFloat(userData.height);
    const age = Number.parseFloat(userData.age);

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
      return 0;
    }

    let bmr = 0;
    if (userData.gender === "masculino") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityFactor = activityLevels[userData.activityLevel].factor;
    return Math.round(bmr * activityFactor);
  };

  const tdee = calculateTDEE();

  const calculateAdjustedCalories = (): number => {
    let adjustment = 0;

    if (userData.goal === "perda") {
      adjustment = -20; // Default 20% deficit for weight loss
    } else if (userData.goal === "ganho") {
      adjustment = 15; // Default 15% surplus for muscle gain
    }

    // Add user's custom adjustment
    adjustment += userData.adjustmentPercentage;

    return Math.round(tdee * (1 + adjustment / 100));
  };

  const adjustedCalories = calculateAdjustedCalories();

  // Calculate macros based on goal
  const calculateMacros = () => {
    const weight = Number.parseFloat(userData.weight);
    if (isNaN(weight)) return { protein: 0, carbs: 0, fat: 0 };

    let protein = 0,
      carbs = 0,
      fat = 0;
    const calories = adjustedCalories;

    if (userData.goal === "perda") {
      protein = Math.round(weight * 2.2); // 2.2g per kg for weight loss
      fat = Math.round(weight * 0.8); // 0.8g per kg for weight loss
      const remainingCalories = calories - protein * 4 - fat * 9;
      carbs = Math.max(0, Math.round(remainingCalories / 4));
    } else if (userData.goal === "ganho") {
      protein = Math.round(weight * 2); // 2g per kg for muscle gain
      fat = Math.round(weight * 1); // 1g per kg for muscle gain
      const remainingCalories = calories - protein * 4 - fat * 9;
      carbs = Math.max(0, Math.round(remainingCalories / 4));
    } else {
      protein = Math.round(weight * 1.8); // 1.8g per kg for maintenance
      fat = Math.round(weight * 0.9); // 0.9g per kg for maintenance
      const remainingCalories = calories - protein * 4 - fat * 9;
      carbs = Math.max(0, Math.round(remainingCalories / 4));
    }

    return { protein, carbs, fat };
  };

  const macros = calculateMacros();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Calculadora TDEE
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Seus Dados
        </Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Idade</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Sua idade"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.age}
            onChangeText={(text) => updateUserData("age", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Gênero
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={userData.gender}
              onValueChange={(value) => updateUserData("gender", value)}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Feminino" value="feminino" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Peso (kg)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Seu peso em kg"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.weight}
            onChangeText={(text) => updateUserData("weight", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Altura (cm)
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Sua altura em cm"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            value={userData.height}
            onChangeText={(text) => updateUserData("height", text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Nível de Atividade
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={userData.activityLevel}
              onValueChange={(value) => updateUserData("activityLevel", value)}
              style={{ color: colors.text }}
            >
              {Object.entries(activityLevels).map(([key, { label }]) => (
                <Picker.Item key={key} label={label} value={key} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            Objetivo
          </Text>
          <View
            style={[
              styles.pickerContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Picker
              selectedValue={userData.goal}
              onValueChange={(value) => updateUserData("goal", value)}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Perda de Peso" value="perda" />
              <Picker.Item label="Manutenção" value="manutenção" />
              <Picker.Item label="Ganho Muscular" value="ganho" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.sliderLabelContainer}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Ajuste Fino
            </Text>
            <Text style={[styles.sliderValue, { color: colors.primary }]}>
              {userData.adjustmentPercentage > 0 ? "+" : ""}
              {userData.adjustmentPercentage}%
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={-30}
            maximumValue={30}
            step={5}
            value={userData.adjustmentPercentage}
            onValueChange={(value) =>
              updateUserData("adjustmentPercentage", value)
            }
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.lightGray}
            thumbTintColor={colors.primary}
          />
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabel, { color: colors.gray }]}>
              -30%
            </Text>
            <Text style={[styles.sliderLabel, { color: colors.gray }]}>0%</Text>
            <Text style={[styles.sliderLabel, { color: colors.gray }]}>
              +30%
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.resultsCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.resultsTitle, { color: colors.text }]}>
            Seus Resultados
          </Text>

          <View style={styles.resultItem}>
            <Text style={[styles.resultLabel, { color: colors.gray }]}>
              TDEE (Gasto Energético Total)
            </Text>
            <Text style={[styles.resultValue, { color: colors.text }]}>
              {tdee} kcal
            </Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={[styles.resultLabel, { color: colors.gray }]}>
              Meta Calórica (
              {userData.goal === "perda"
                ? "Déficit"
                : userData.goal === "ganho"
                ? "Superávit"
                : "Manutenção"}
              )
            </Text>
            <Text style={[styles.resultValue, { color: colors.primary }]}>
              {adjustedCalories} kcal
            </Text>
          </View>

          <View style={styles.macrosContainer}>
            <Text style={[styles.macrosTitle, { color: colors.text }]}>
              Macronutrientes Recomendados
            </Text>

            <View style={styles.macroItem}>
              <Text style={[styles.macroLabel, { color: colors.text }]}>
                Proteínas
              </Text>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {macros.protein}g
              </Text>
              <Text style={[styles.macroCalories, { color: colors.gray }]}>
                {macros.protein * 4} kcal
              </Text>
            </View>

            <View style={styles.macroItem}>
              <Text style={[styles.macroLabel, { color: colors.text }]}>
                Carboidratos
              </Text>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {macros.carbs}g
              </Text>
              <Text style={[styles.macroCalories, { color: colors.gray }]}>
                {macros.carbs * 4} kcal
              </Text>
            </View>

            <View style={styles.macroItem}>
              <Text style={[styles.macroLabel, { color: colors.text }]}>
                Gorduras
              </Text>
              <Text style={[styles.macroValue, { color: colors.text }]}>
                {macros.fat}g
              </Text>
              <Text style={[styles.macroCalories, { color: colors.gray }]}>
                {macros.fat * 9} kcal
              </Text>
            </View>
          </View>
        </View>

        <Button
          title="Aplicar como Meta"
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.applyButton}
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
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sliderLabel: {
    fontSize: 12,
  },
  resultsCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  resultItem: {
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "600",
  },
  macrosContainer: {
    marginTop: 16,
  },
  macrosTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  macroItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 14,
    flex: 1,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  macroCalories: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  applyButton: {
    marginTop: 10,
  },
});

export default TDEECalculatorScreen;
