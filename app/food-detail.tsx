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
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContent";
import Button from "../components/Button";
import Slider from "@react-native-community/slider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Type definitions
type FoodItem = {
  id: string;
  name: string;
  calories: number;
  portion: string;
  category: string;
  protein?: number;
  carbs?: number;
  fat?: number;
};

type FoodDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "FoodDetail">;
  route: {
    params: {
      food: FoodItem;
    };
  };
};

type MealOption = "Café da Manhã" | "Almoço" | "Jantar" | "Lanche";

const FoodDetailScreen = ({ route, navigation }: FoodDetailScreenProps) => {
  const { food } = route.params;
  const { colors } = useTheme();
  const [quantity, setQuantity] = useState<number>(100);
  const [selectedMeal, setSelectedMeal] = useState<MealOption>("Café da Manhã");

  const meals: MealOption[] = ["Café da Manhã", "Almoço", "Jantar", "Lanche"];

  // Calculate nutrition based on quantity
  const calculateNutrition = (baseValue: number): number => {
    return Math.round((baseValue / 100) * quantity);
  };

  const handleAddFood = () => {
    // Here you would add the food to the meal diary
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Detalhes do Alimento
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.foodCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.foodName, { color: colors.text }]}>
            {food.name}
          </Text>
          <Text style={[styles.foodCategory, { color: colors.gray }]}>
            {food.category}
          </Text>

          <View style={styles.nutritionContainer}>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.primary }]}>
                {calculateNutrition(food.calories)}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                kcal
              </Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {calculateNutrition(food.protein || 0)}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                Proteínas
              </Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {calculateNutrition(food.carbs || 0)}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                Carboidratos
              </Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {calculateNutrition(food.fat || 0)}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                Gorduras
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.quantityCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quantidade
          </Text>

          <View style={styles.quantityContainer}>
            <Text style={[styles.quantityValue, { color: colors.primary }]}>
              {quantity}g
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={500}
              step={5}
              value={quantity}
              onValueChange={setQuantity}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.lightGray}
              thumbTintColor={colors.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, { color: colors.gray }]}>
                10g
              </Text>
              <Text style={[styles.sliderLabel, { color: colors.gray }]}>
                500g
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.mealCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Adicionar à Refeição
          </Text>

          <View style={styles.mealOptions}>
            {meals.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={[
                  styles.mealOption,
                  {
                    backgroundColor:
                      selectedMeal === meal ? colors.primary : "transparent",
                    borderColor:
                      selectedMeal === meal ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedMeal(meal)}
              >
                <Text
                  style={[
                    styles.mealOptionText,
                    { color: selectedMeal === meal ? "#FFFFFF" : colors.text },
                  ]}
                >
                  {meal}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Adicionar à Refeição"
          onPress={handleAddFood}
          style={styles.addButton}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  foodCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  foodCategory: {
    fontSize: 14,
    marginBottom: 16,
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
  },
  quantityCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  quantityContainer: {
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sliderLabel: {
    fontSize: 12,
  },
  mealCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  mealOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  mealOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: "45%",
  },
  mealOptionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  addButton: {
    marginTop: 10,
  },
});

export default FoodDetailScreen;
