"use client";

import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

export default function AlturaScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [altura, setAltura] = useState(165);
  const [alturaExibida, setAlturaExibida] = useState(165);
  const alturaTemp = useRef(165);

  const handleNext = () => {
    setAltura(alturaTemp.current);
    navigation.navigate("Genero");
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

        <View style={styles.heightDisplay}>
          <Text style={styles.heightValue}>{alturaExibida}</Text>
          <Text style={styles.heightUnit}>cm</Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={140}
            maximumValue={220}
            step={1}
            value={altura}
            onValueChange={(value) => {
              alturaTemp.current = value;
              setAlturaExibida(value);
            }}
            minimumTrackTintColor="#FF5722"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#FF5722"
          />
          <View style={styles.sliderMarks}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
              <View key={index} style={styles.sliderMark}>
                <View style={styles.sliderMarkLine} />
                <Text style={styles.sliderMarkText}>
                  {Math.round(140 + index * 10)}
                </Text>
              </View>
            ))}
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFE5E0",
    borderRadius: 2,
  },
  progressFill: {
    width: "25%",
    height: 4,
    backgroundColor: "#FF5722",
    borderRadius: 2,
  },
  question: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 30,
    fontFamily: "Poppins-Bold",
  },
  heightDisplay: {
    alignItems: "center",
    marginBottom: 40,
  },
  heightValue: {
    fontSize: 72,
    fontWeight: "700",
    color: "#212121",
    fontFamily: "Poppins-Bold",
  },
  heightUnit: {
    fontSize: 18,
    color: "#757575",
    fontFamily: "Poppins-Regular",
    marginTop: -10,
  },
  sliderContainer: {
    marginBottom: 60,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderMarks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sliderMark: {
    alignItems: "center",
    width: (width - 68) / 9,
  },
  sliderMarkLine: {
    height: 10,
    width: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 5,
  },
  sliderMarkText: {
    fontSize: 12,
    color: "#BDBDBD",
    fontFamily: "Poppins-Regular",
  },
  nextButton: {
    backgroundColor: "#3A3E4F",
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
