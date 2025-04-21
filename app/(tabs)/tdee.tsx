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
import type { TabScreenProps } from "../../types/navigation";

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

const TDEECalculatorScreen = ({ navigation }: TabScreenProps<"Macros">) => {
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
      label: "Sedentário",
      description: "Pouco ou nenhum exercício",
      factor: 1.2,
    },
    {
      id: "light",
      label: "Levemente Ativo",
      description: "Exercício 1-3 vezes/semana",
      factor: 1.375,
    },
    {
      id: "moderate",
      label: "Moderadamente Ativo",
      description: "Exercício 4-5 vezes/semana",
      factor: 1.55,
    },
    {
      id: "very",
      label: "Muito Ativo",
      description: "Exercício 6-7 vezes/semana",
      factor: 1.725,
    },
    {
      id: "extreme",
      label: "Extremamente Ativo",
      description: "Exercício & trabalho físico ou 2x treino",
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
      setUserData({ ...userData, [key]: value });
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
    <SafeAreaView style={[styles.container, { backgroundColor: "#F6F6F6" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Calculadora TDEE</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gender Selection */}
        <Text style={styles.inputLabel}>Gênero</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              {
                backgroundColor:
                  userData.gender === "male" ? "#e950a3" : "#FFFFFF",
                borderColor: userData.gender === "male" ? "#e950a3" : "#E0E0E0",
              },
            ]}
            onPress={() => updateUserData("gender", "male")}
          >
            <Text
              style={[
                styles.genderButtonText,
                { color: userData.gender === "male" ? "#FFFFFF" : "#333333" },
              ]}
            >
              Masculino
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              {
                backgroundColor:
                  userData.gender === "female" ? "#e950a3" : "#FFFFFF",
                borderColor:
                  userData.gender === "female" ? "#e950a3" : "#E0E0E0",
              },
            ]}
            onPress={() => updateUserData("gender", "female")}
          >
            <Text
              style={[
                styles.genderButtonText,
                {
                  color: userData.gender === "female" ? "#FFFFFF" : "#333333",
                },
              ]}
            >
              Feminino
            </Text>
          </TouchableOpacity>
        </View>

        {/* Age Input */}
        <Text style={styles.inputLabel}>Idade</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Anos"
            placeholderTextColor="#9E9E9E"
            keyboardType="numeric"
            value={userData.age}
            onChangeText={(text) => updateUserData("age", text)}
          />
        </View>

        {/* Weight Input */}
        <Text style={styles.inputLabel}>Peso</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="kg"
            placeholderTextColor="#9E9E9E"
            keyboardType="numeric"
            value={userData.weight}
            onChangeText={(text) => updateUserData("weight", text)}
          />
          <Text style={styles.inputUnit}>kg</Text>
        </View>

        {/* Height Input */}
        <Text style={styles.inputLabel}>Altura</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="cm"
            placeholderTextColor="#9E9E9E"
            keyboardType="numeric"
            value={userData.height}
            onChangeText={(text) => updateUserData("height", text)}
          />
          <Text style={styles.inputUnit}>cm</Text>
        </View>

        {/* Activity Level */}
        <Text style={styles.inputLabel}>Nível de Atividade</Text>
        <View style={styles.activityContainer}>
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.activityButton,
                {
                  backgroundColor:
                    userData.activityLevel === level.id ? "#e950a3" : "#FFFFFF",
                  borderColor:
                    userData.activityLevel === level.id ? "#e950a3" : "#E0E0E0",
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
                        : "#333333",
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
                        : "#9E9E9E",
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
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Suas Calorias Diárias</Text>

            <Text style={styles.tdeeValue}>{formatNumber(tdee)}</Text>
            <Text style={styles.tdeeSubtitle}>Calorias de Manutenção</Text>

            <View style={styles.divider} />

            <View style={styles.optionsContainer}>
              <View style={styles.optionColumn}>
                <Text style={styles.optionLabel}>Perda de Peso (-20%)</Text>
                <Text style={styles.optionValue}>
                  {formatNumber(cuttingCalories)} cal
                </Text>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.optionColumn}>
                <Text style={styles.optionLabel}>Ganho de Peso (+20%)</Text>
                <Text style={styles.optionValue}>
                  {formatNumber(bulkingCalories)} cal
                </Text>
              </View>
            </View>

            <View style={styles.additionalInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>TMB:</Text>
                <Text style={styles.infoValue}>{bmr} calorias/dia</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Multiplicador de Atividade:
                </Text>
                <Text style={styles.infoValue}>x{activityMultiplier}</Text>
              </View>
            </View>
          </View>
        )}

        <Button
          title="Calcular TDEE"
          onPress={calculateTDEE}
          style={styles.calculateButton}
          variant="primary"
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
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
    color: "#333333",
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
    borderRadius: 25,
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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  inputUnit: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#9E9E9E",
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityButton: {
    padding: 16,
    borderRadius: 16,
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
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  tdeeValue: {
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#e950a3",
  },
  tdeeSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
    color: "#9E9E9E",
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 16,
    backgroundColor: "#F0F0F0",
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
    backgroundColor: "#F0F0F0",
  },
  optionLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  optionValue: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#e950a3",
  },
  additionalInfo: {
    width: "100%",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#9E9E9E",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#333333",
  },
  calculateButton: {
    height: 56,
    backgroundColor: "#e950a3",
    borderRadius: 28,
  },
});

export default TDEECalculatorScreen;
