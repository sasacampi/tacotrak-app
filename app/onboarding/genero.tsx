"use client";

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function GeneroScreen() {
  const navigation = useNavigation();
  const [genero, setGenero] = useState<"masculino" | "feminino" | null>(null);

  const handleNext = () => {
    if (genero) {
      navigation.navigate("Idade" as never);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#212121" />
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Text style={styles.question}>Qual é o seu gênero?</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              genero === "masculino" && styles.optionButtonSelected,
            ]}
            onPress={() => setGenero("masculino")}
          >
            <Feather
              name="circle"
              size={20}
              color={genero === "masculino" ? "#FFFFFF" : "#FF5722"}
            />
            <Text
              style={[
                styles.optionText,
                genero === "masculino" && styles.optionTextSelected,
              ]}
            >
              Masculino
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              genero === "feminino" && styles.optionButtonSelected,
            ]}
            onPress={() => setGenero("feminino")}
          >
            <Feather
              name="circle"
              size={20}
              color={genero === "feminino" ? "#FFFFFF" : "#FF5722"}
            />
            <Text
              style={[
                styles.optionText,
                genero === "feminino" && styles.optionTextSelected,
              ]}
            >
              Feminino
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !genero && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!genero}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progressFill: {
    width: "50%",
    height: 4,
    backgroundColor: "#FF5722",
    borderRadius: 2,
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 40,
    fontFamily: "Poppins-Bold",
  },
  optionsContainer: {
    marginBottom: 40,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF5722",
    backgroundColor: "#FFFFFF",
  },
  optionButtonSelected: {
    backgroundColor: "#FF5722",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
    marginLeft: 12,
    fontFamily: "Poppins-Medium",
  },
  optionTextSelected: {
    color: "#FFFFFF",
  },
  nextButton: {
    backgroundColor: "#FF5722",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  nextButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
