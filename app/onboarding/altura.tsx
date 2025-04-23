"use client";

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

export default function AlturaScreen() {
  const navigation = useNavigation();
  const [altura, setAltura] = useState(165);

  const handleNext = () => {
    navigation.navigate("Genero" as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Text style={styles.question}>Qual é a sua altura?</Text>

        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{altura}</Text>
          <Text style={styles.unitText}>cm</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={140}
            maximumValue={220}
            step={1}
            value={altura}
            onValueChange={setAltura}
            minimumTrackTintColor="#FF5722"
            maximumTrackTintColor="#E0E0E0"
            thumbImage={require("../../assets/images/height-thumb.png")}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>140</Text>
            <Text style={styles.sliderLabel}>180</Text>
            <Text style={styles.sliderLabel}>220</Text>
          </View>
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
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progressFill: {
    width: "25%",
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
  valueContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 60,
  },
  valueText: {
    fontSize: 64,
    fontWeight: "700",
    color: "#212121",
    fontFamily: "Poppins-Bold",
  },
  unitText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
  sliderContainer: {
    marginBottom: 60,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#757575",
    fontFamily: "Poppins-Regular",
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
