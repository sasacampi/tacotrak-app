"use client";

import { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MealCard from "../components/MealCard";

interface MealItem {
  id: string;
  name: string;
  calories: number;
}

const MealCardDemoScreen = () => {
  const [breakfastItems, setBreakfastItems] = useState<MealItem[]>([
    {
      id: "1",
      name: "Salada com trigo e ovo branco",
      calories: 200,
    },
    {
      id: "2",
      name: "Iogurte com granola",
      calories: 150,
    },
  ]);

  const [lunchItems, setLunchItems] = useState<MealItem[]>([
    {
      id: "3",
      name: "Arroz integral com frango",
      calories: 320,
    },
  ]);

  const handleAddBreakfastItem = () => {
    Alert.alert("Adicionar", "Adicionar novo item ao café da manhã");
  };

  const handleBreakfastItemPress = (item: MealItem) => {
    Alert.alert("Item selecionado", `Você selecionou: ${item.name}`);
  };

  const handleAddLunchItem = () => {
    Alert.alert("Adicionar", "Adicionar novo item ao almoço");
  };

  const handleLunchItemPress = (item: MealItem) => {
    Alert.alert("Item selecionado", `Você selecionou: ${item.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <MealCard
          title="Café da manhã"
          consumedCalories={350}
          totalCalories={450}
          items={breakfastItems}
          onAddItem={handleAddBreakfastItem}
          onItemPress={handleBreakfastItemPress}
        />

        <MealCard
          title="Almoço"
          consumedCalories={320}
          totalCalories={650}
          items={lunchItems}
          onAddItem={handleAddLunchItem}
          onItemPress={handleLunchItemPress}
        />

        <MealCard
          title="Jantar"
          consumedCalories={0}
          totalCalories={500}
          items={[]}
          onAddItem={() =>
            Alert.alert("Adicionar", "Adicionar novo item ao jantar")
          }
          onItemPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

export default MealCardDemoScreen;
