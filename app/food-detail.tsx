"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./context/ThemeContext";
import Button from "../components/Button";
import Slider from "@react-native-community/slider";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

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

type FoodDetailRouteProp = RouteProp<RootStackParamList, "FoodDetail">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FoodDetail"
>;

type MealOption = "Café da Manhã" | "Almoço" | "Jantar" | "Lanche";

const FoodDetailScreen = () => {
  const route = useRoute<FoodDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const params = route.params;
  const foodId = params?.foodId;
  const food = {
    id: "1",
    name: "Alimento de exemplo",
    calories: 100,
    portion: "100g",
    category: "Exemplo",
    protein: 10,
    carbs: 10,
    fat: 5,
  };

  const { colors } = useTheme(); // Moved inside the component to ensure it's always called

  const [quantity, setQuantity] = useState<number>(100);
  const [selectedMeal, setSelectedMeal] = useState<MealOption>("Café da Manhã");

  if (!food) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: "red" }}>
          Erro: Nenhum alimento foi fornecido.
        </Text>
      </SafeAreaView>
    );
  }

  const meals: MealOption[] = ["Café da Manhã", "Almoço", "Jantar", "Lanche"];

  const calculateNutrition = (baseValue: number): number => {
    return Math.round((baseValue / 100) * quantity);
  };

  // Valores padrão caso não existam
  const proteinValue = food.protein || 0;
  const carbsValue = food.carbs || 0;
  const fatValue = food.fat || 0;

  // Cálculo dos valores ajustados pela quantidade
  const adjustedProtein = calculateNutrition(proteinValue);
  const adjustedCarbs = calculateNutrition(carbsValue);
  const adjustedFat = calculateNutrition(fatValue);

  // Cálculo do total de macronutrientes
  const totalMacros = adjustedProtein + adjustedCarbs + adjustedFat;

  // Cálculo das porcentagens
  const proteinPercentage =
    totalMacros > 0 ? Math.round((adjustedProtein / totalMacros) * 100) : 0;
  const carbsPercentage =
    totalMacros > 0 ? Math.round((adjustedCarbs / totalMacros) * 100) : 0;
  const fatPercentage =
    totalMacros > 0 ? Math.round((adjustedFat / totalMacros) * 100) : 0;

  const handleAddFood = () => {
    // Navegar para a tela principal com a tab Dashboard selecionada
    navigation.navigate("MainTabs", {
      screen: "Dashboard",
    });
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
                {adjustedProtein}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                Proteínas
              </Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {adjustedCarbs}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.gray }]}>
                Carboidratos
              </Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {adjustedFat}
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
            styles.nutritionFactsCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Informação Nutricional
          </Text>

          <View style={styles.macroCirclesContainer}>
            <View style={styles.macroCircle}>
              <View style={styles.circleContainer}>
                <View
                  style={[
                    styles.circleProgress,
                    {
                      borderColor: "#70B01B",
                      borderTopColor: "transparent",
                      transform: [{ rotate: `${carbsPercentage * 3.6}deg` }],
                    },
                  ]}
                />
                <View
                  style={[styles.circleInner, { backgroundColor: colors.card }]}
                />
                <Text style={styles.circleText}>{carbsPercentage}%</Text>
              </View>
              <Text style={styles.macroLabel}>Carboidratos</Text>
              <Text style={styles.macroValue}>{adjustedCarbs}g</Text>
            </View>

            <View style={styles.macroCircle}>
              <View style={styles.circleContainer}>
                <View
                  style={[
                    styles.circleProgress,
                    {
                      borderColor: "#e950a3",
                      borderTopColor: "transparent",
                      transform: [{ rotate: `${proteinPercentage * 3.6}deg` }],
                    },
                  ]}
                />
                <View
                  style={[styles.circleInner, { backgroundColor: colors.card }]}
                />
                <Text style={styles.circleText}>{proteinPercentage}%</Text>
              </View>
              <Text style={styles.macroLabel}>Proteínas</Text>
              <Text style={styles.macroValue}>{adjustedProtein}g</Text>
            </View>

            <View style={styles.macroCircle}>
              <View style={styles.circleContainer}>
                <View
                  style={[
                    styles.circleProgress,
                    {
                      borderColor: "#4CAF50",
                      borderTopColor: "transparent",
                      transform: [{ rotate: `${fatPercentage * 3.6}deg` }],
                    },
                  ]}
                />
                <View
                  style={[styles.circleInner, { backgroundColor: colors.card }]}
                />
                <Text style={styles.circleText}>{fatPercentage}%</Text>
              </View>
              <Text style={styles.macroLabel}>Gorduras</Text>
              <Text style={styles.macroValue}>{adjustedFat}g</Text>
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
    fontFamily: "Poppins-SemiBold",
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
    fontFamily: "Poppins-SemiBold",
  },
  foodCategory: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-SemiBold",
  },
  nutritionLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-SemiBold",
  },
  quantityContainer: {
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
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
    fontFamily: "Poppins-Regular",
  },
  nutritionFactsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  macroCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  macroCircle: {
    alignItems: "center",
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  circleProgress: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    position: "absolute",
  },
  circleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
  },
  circleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  macroLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    fontFamily: "Poppins-Medium",
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
    fontFamily: "Poppins-Medium",
  },
  addButton: {
    marginTop: 10,
  },
});

export default FoodDetailScreen;
