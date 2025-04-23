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

// Constantes
const MIN_AGE = 16;
const MAX_AGE = 80;
const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 300;

// Offset para ajustar a posição vertical do número
const VERTICAL_OFFSET = 30; // Ajuste este valor conforme necessário para mover mais para cima

export default function IdadeScreen() {
  const navigation = useNavigation<any>();
  const [idade, setIdade] = useState(20);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    navigation.navigate("Peso");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Gera a lista de idades com tipo explícito
  const ages: number[] = [];
  for (let i = MIN_AGE; i <= MAX_AGE; i++) {
    ages.push(i);
  }

  // Função para lidar com a seleção de idade
  const handleAgeSelect = (age: number) => {
    setIdade(age);

    // Encontra o índice da idade selecionada
    const index = ages.indexOf(age);
    if (index !== -1 && scrollRef.current) {
      // Calcula a posição para centralizar o item com ajuste vertical
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

        <Text style={styles.question}>Qual é a sua idade?</Text>

        <View style={styles.ageSelector}>
          {/* Área destacada fixa no centro */}
          <View style={styles.ageSelectorHighlight} />

          <ScrollView
            ref={scrollRef}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ageOptionsContainer}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              // Quando parar de rolar, encontra o item mais próximo do centro
              const y = event.nativeEvent.contentOffset.y - VERTICAL_OFFSET;
              const index = Math.round(y / ITEM_HEIGHT);

              if (index >= 0 && index < ages.length) {
                setIdade(ages[index]);
              }
            }}
          >
            {ages.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.ageOption,
                  idade === age && styles.selectedAgeOption,
                ]}
                onPress={() => handleAgeSelect(age)}
              >
                <Text
                  style={[
                    styles.ageText,
                    idade === age && styles.selectedAgeText,
                  ]}
                >
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    height: CONTAINER_HEIGHT,
    position: "relative",
    marginBottom: 40,
    overflow: "hidden",
  },
  ageSelectorHighlight: {
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
  ageOptionsContainer: {
    paddingVertical: CONTAINER_HEIGHT / 2,
  },
  ageOption: {
    height: ITEM_HEIGHT,
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
