"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function IdadeScreen() {
  const navigation = useNavigation();
  const [idade, setIdade] = useState(20);

  const handleNext = () => {
    navigation.navigate("Peso" as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderAgeOptions = () => {
    const ages = [];
    for (let i = 16; i <= 80; i++) {
      ages.push(i);
    }

    return (
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ageOptionsContainer}
      >
        {ages.map((age) => (
          <TouchableOpacity
            key={age}
            style={[
              styles.ageOption,
              idade === age && styles.selectedAgeOption,
            ]}
            onPress={() => setIdade(age)}
          >
            <Text
              style={[styles.ageText, idade === age && styles.selectedAgeText]}
            >
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
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

        <Text style={styles.question}>Qual é a sua idade?</Text>

        <View style={styles.ageSelector}>
          <View style={styles.ageSelectorHighlight} />
          {renderAgeOptions()}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    width: "75%",
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
  ageSelector: {
    height: 300,
    position: "relative",
    marginBottom: 40,
  },
  ageSelectorHighlight: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#FF5722",
    opacity: 0.1,
    borderRadius: 30,
    transform: [{ translateY: -30 }],
    zIndex: 1,
  },
  ageOptionsContainer: {
    paddingVertical: 120,
  },
  ageOption: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedAgeOption: {
    transform: [{ scale: 1.2 }],
  },
  ageText: {
    fontSize: 24,
    color: "#BDBDBD",
    fontFamily: "Poppins-Medium",
  },
  selectedAgeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FF5722",
    fontFamily: "Poppins-Bold",
  },
  nextButton: {
    backgroundColor: "#FF5722",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
