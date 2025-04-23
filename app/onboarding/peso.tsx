"use client";

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";

export default function PesoScreen() {
  const navigation = useNavigation();
  const [peso, setPeso] = useState(67);

  const handleNext = () => {
    navigation.navigate("MainTabs" as never, { screen: "Dashboard" } as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Calculate gauge angle based on weight
  const minWeight = 40;
  const maxWeight = 120;
  const startAngle = -120;
  const endAngle = 120;
  const angleRange = endAngle - startAngle;
  const weightRange = maxWeight - minWeight;
  const weightPercentage = (peso - minWeight) / weightRange;
  const angle = startAngle + angleRange * weightPercentage;
  const angleInRadians = (angle * Math.PI) / 180;

  // Calculate needle endpoint
  const centerX = 150;
  const centerY = 150;
  const radius = 120;
  const needleX = centerX + radius * Math.cos(angleInRadians);
  const needleY = centerY + radius * Math.sin(angleInRadians);

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

        <View style={styles.weightContainer}>
          <Text style={styles.weightValue}>{peso}</Text>
          <Text style={styles.weightUnit}>kg</Text>
        </View>

        <View style={styles.gaugeContainer}>
          <Svg height="300" width="300" viewBox="0 0 300 300">
            {/* Gauge background */}
            <Path
              d={`M 30 150 A 120 120 0 0 1 270 150`}
              stroke="#E0E0E0"
              strokeWidth="10"
              fill="none"
            />
            {/* Gauge fill */}
            <Path
              d={`M 30 150 A 120 120 0 0 1 ${needleX} ${needleY}`}
              stroke="#FF5722"
              strokeWidth="10"
              fill="none"
            />
            {/* Gauge markers */}
            <Text
              x="30"
              y="180"
              fill="#757575"
              fontSize="12"
              textAnchor="middle"
            >
              {minWeight}
            </Text>
            <Text
              x="150"
              y="50"
              fill="#757575"
              fontSize="12"
              textAnchor="middle"
            >
              {Math.round((minWeight + maxWeight) / 2)}
            </Text>
            <Text
              x="270"
              y="180"
              fill="#757575"
              fontSize="12"
              textAnchor="middle"
            >
              {maxWeight}
            </Text>
            {/* Needle */}
            <Path
              d={`M 150 150 L ${needleX} ${needleY}`}
              stroke="#FF5722"
              strokeWidth="2"
              fill="none"
            />
            <Circle cx="150" cy="150" r="10" fill="#FF5722" />
          </Svg>
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
    width: "100%",
    height: 4,
    backgroundColor: "#FF5722",
    borderRadius: 2,
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  weightValue: {
    fontSize: 64,
    fontWeight: "700",
    color: "#212121",
    fontFamily: "Poppins-Bold",
  },
  weightUnit: {
    fontSize: 20,
    color: "#757575",
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
  gaugeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
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
