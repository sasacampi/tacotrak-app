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
import { useTheme } from "./context/ThemeContext";
import Button from "../components/Button";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Type definitions
type UserData = {
  name: string;
  age: string;
  gender: "masculino" | "feminino" | "outro";
  weight: string;
  height: string;
  activityLevel: "sedentario" | "leve" | "moderado" | "muito" | "extremo";
  goal: "perda" | "manutenção" | "ganho";
};

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Onboarding">;
};

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    gender: "masculino",
    weight: "",
    height: "",
    activityLevel: "moderado",
    goal: "manutenção",
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("Dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = <K extends keyof UserData>(
    key: K,
    value: UserData[K]
  ) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Dados Pessoais
            </Text>
            <Text style={[styles.stepDescription, { color: colors.gray }]}>
              Vamos começar com algumas informações básicas
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Nome
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
                placeholder="Seu nome"
                placeholderTextColor={colors.gray}
                value={userData.name}
                onChangeText={(text) => updateUserData("name", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Idade
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
                  <Picker.Item label="Outro" value="outro" />
                </Picker>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Medidas Corporais
            </Text>
            <Text style={[styles.stepDescription, { color: colors.gray }]}>
              Essas informações nos ajudam a calcular suas necessidades
              calóricas
            </Text>

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
                  onValueChange={(value) =>
                    updateUserData("activityLevel", value)
                  }
                  style={{ color: colors.text }}
                >
                  <Picker.Item label="Sedentário" value="sedentario" />
                  <Picker.Item label="Levemente ativo" value="leve" />
                  <Picker.Item label="Moderadamente ativo" value="moderado" />
                  <Picker.Item label="Muito ativo" value="muito" />
                  <Picker.Item label="Extremamente ativo" value="extremo" />
                </Picker>
              </View>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={[styles.stepTitle, { color: colors.text }]}>
              Seu Objetivo
            </Text>
            <Text style={[styles.stepDescription, { color: colors.gray }]}>
              Qual é o seu objetivo principal?
            </Text>

            <View style={styles.goalContainer}>
              <TouchableOpacity
                style={[
                  styles.goalOption,
                  {
                    backgroundColor:
                      userData.goal === "perda" ? colors.primary : colors.card,
                    borderColor:
                      userData.goal === "perda"
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() => updateUserData("goal", "perda")}
              >
                <Feather
                  name="trending-down"
                  size={24}
                  color={userData.goal === "perda" ? "#FFFFFF" : colors.text}
                />
                <Text
                  style={[
                    styles.goalText,
                    {
                      color:
                        userData.goal === "perda" ? "#FFFFFF" : colors.text,
                    },
                  ]}
                >
                  Perda de Peso
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.goalOption,
                  {
                    backgroundColor:
                      userData.goal === "manutenção"
                        ? colors.primary
                        : colors.card,
                    borderColor:
                      userData.goal === "manutenção"
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() => updateUserData("goal", "manutenção")}
              >
                <Feather
                  name="minus"
                  size={24}
                  color={
                    userData.goal === "manutenção" ? "#FFFFFF" : colors.text
                  }
                />
                <Text
                  style={[
                    styles.goalText,
                    {
                      color:
                        userData.goal === "manutenção"
                          ? "#FFFFFF"
                          : colors.text,
                    },
                  ]}
                >
                  Manutenção
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.goalOption,
                  {
                    backgroundColor:
                      userData.goal === "ganho" ? colors.primary : colors.card,
                    borderColor:
                      userData.goal === "ganho"
                        ? colors.primary
                        : colors.border,
                  },
                ]}
                onPress={() => updateUserData("goal", "ganho")}
              >
                <Feather
                  name="trending-up"
                  size={24}
                  color={userData.goal === "ganho" ? "#FFFFFF" : colors.text}
                />
                <Text
                  style={[
                    styles.goalText,
                    {
                      color:
                        userData.goal === "ganho" ? "#FFFFFF" : colors.text,
                    },
                  ]}
                >
                  Ganho Muscular
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                Com base nos seus dados:
              </Text>
              <Text style={[styles.summaryText, { color: colors.text }]}>
                Seu TDEE estimado:{" "}
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  2200 kcal
                </Text>
              </Text>
              <Text style={[styles.summaryText, { color: colors.text }]}>
                Meta diária recomendada:{" "}
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  {userData.goal === "perda"
                    ? "1800"
                    : userData.goal === "ganho"
                    ? "2500"
                    : "2200"}{" "}
                  kcal
                </Text>
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.primary }]}>TacoTrak</Text>
          <Text style={[styles.tagline, { color: colors.text }]}>
            Rastreamento nutricional inteligente
          </Text>
        </View>

        <View style={styles.stepsIndicator}>
          {[1, 2, 3].map((step) => (
            <View
              key={step}
              style={[
                styles.stepDot,
                {
                  backgroundColor:
                    step <= currentStep ? colors.primary : colors.lightGray,
                },
              ]}
            />
          ))}
        </View>

        {renderStep()}

        <View style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <Button
              title="Voltar"
              onPress={handleBack}
              variant="outline"
              style={{ flex: 1, marginRight: 8 }}
            />
          )}
          <Button
            title={currentStep === 3 ? "Concluir" : "Próximo"}
            onPress={handleNext}
            style={{
              flex: currentStep === 1 ? 1 : 1,
              marginLeft: currentStep > 1 ? 8 : 0,
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
  },
  stepsIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
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
  goalContainer: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 30,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  summaryContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: "auto",
    paddingTop: 20,
  },
});

export default OnboardingScreen;
