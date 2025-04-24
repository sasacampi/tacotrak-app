"use client";

import { useState, useRef } from "react";
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

const MIN_WEIGHT = 40;
const MAX_WEIGHT = 120;
const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 300;

const VERTICAL_OFFSET = 30;

export default function PesoScreen() {
  const navigation = useNavigation<any>();
  const [peso, setPeso] = useState(67);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",
          params: { screen: "Dashboard" },
        },
      ],
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const weights: number[] = [];
  for (let i = MIN_WEIGHT; i <= MAX_WEIGHT; i++) {
    weights.push(i);
  }

  const handleWeightSelect = (weight: number) => {
    setPeso(weight);

    const index = weights.indexOf(weight);
    if (index !== -1 && scrollRef.current) {
      const centerOffset = index * ITEM_HEIGHT + VERTICAL_OFFSET;

      scrollRef.current.scrollTo({
        y: centerOffset,
        animated: true,
      });
    }
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

        <Text style={styles.question}>Qual é o seu peso?</Text>

        <View style={styles.weightSelector}>
          <View style={styles.weightSelectorHighlight} />

          <ScrollView
            ref={scrollRef}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.weightOptionsContainer}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              const y = event.nativeEvent.contentOffset.y - VERTICAL_OFFSET;
              const index = Math.round(y / ITEM_HEIGHT);

              if (index >= 0 && index < weights.length) {
                setPeso(weights[index]);
              }
            }}
          >
            {weights.map((weight) => (
              <TouchableOpacity
                key={weight}
                style={[
                  styles.weightOption,
                  peso === weight && styles.selectedWeightOption,
                ]}
                onPress={() => handleWeightSelect(weight)}
              >
                <Text
                  style={[
                    styles.weightText,
                    peso === weight && styles.selectedWeightText,
                  ]}
                >
                  {weight}
                  {peso === weight && (
                    <Text style={styles.weightUnit}> kg</Text>
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 40,
    fontFamily: "Poppins-Bold",
  },
  weightSelector: {
    height: CONTAINER_HEIGHT,
    position: "relative",
    marginBottom: 40,
    overflow: "hidden",
  },
  weightSelectorHighlight: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: "#FF5722",
    opacity: 0.1,
    borderRadius: 30,
    transform: [{ translateY: -ITEM_HEIGHT / 2 }],
    zIndex: 1,
  },
  weightOptionsContainer: {
    paddingVertical: CONTAINER_HEIGHT / 2,
  },
  weightOption: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedWeightOption: {
    transform: [{ scale: 1.2 }],
  },
  weightText: {
    fontSize: 24,
    color: "#BDBDBD",
    fontFamily: "Poppins-Medium",
  },
  selectedWeightText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FF5722",
    fontFamily: "Poppins-Bold",
  },
  weightUnit: {
    fontSize: 18,
    color: "#FF5722",
    fontFamily: "Poppins-Medium",
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
