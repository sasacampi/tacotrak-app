import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import MealSection from "../../components/MealSection";
import { AppNavigationProp } from "../../types/navigation";

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  portion: string;
};

type Meal = {
  title: string;
  totalCalories: number;
  foods: FoodItem[];
};

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

type MockMeals = Record<MealType, Meal>;

type MealDiaryScreenProps = {
  navigation: AppNavigationProp;
};

const mockMeals: MockMeals = {
  breakfast: {
    title: "Café da Manhã",
    totalCalories: 350,
    foods: [
      {
        id: "1",
        name: "Pão francês",
        calories: 150,
        portion: "50g (1 unidade)",
      },
      { id: "2", name: "Ovo cozido", calories: 70, portion: "50g (1 unidade)" },
      {
        id: "3",
        name: "Banana prata",
        calories: 89,
        portion: "100g (1 unidade)",
      },
    ],
  },
  lunch: {
    title: "Almoço",
    totalCalories: 650,
    foods: [
      { id: "4", name: "Arroz branco", calories: 128, portion: "100g" },
      { id: "5", name: "Feijão carioca", calories: 76, portion: "100g" },
      {
        id: "6",
        name: "Peito de frango grelhado",
        calories: 159,
        portion: "100g",
      },
      { id: "7", name: "Alface", calories: 15, portion: "50g" },
    ],
  },
  dinner: {
    title: "Jantar",
    totalCalories: 450,
    foods: [
      { id: "8", name: "Batata doce", calories: 86, portion: "100g" },
      { id: "9", name: "Filé de peixe", calories: 170, portion: "100g" },
      { id: "10", name: "Brócolis", calories: 34, portion: "100g" },
    ],
  },
  snacks: {
    title: "Lanches",
    totalCalories: 0,
    foods: [],
  },
};

const MealDiaryScreen: React.FC<MealDiaryScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();

  const handleAddFood = (mealType: MealType) => {
    navigation.navigate("AddFood", { mealType });
  };

  const handleFoodPress = (food: FoodItem) => {
    navigation.navigate("FoodDetail", { food });
  };

  const totalCalories = Object.values(mockMeals).reduce(
    (sum, meal) => sum + meal.totalCalories,
    0
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Diário de Refeições
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.dateText, { color: colors.text }]}>
          Hoje, 3 de Abril
        </Text>
        <TouchableOpacity>
          <Feather name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.summaryCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.summaryTitle, { color: colors.text }]}>
          Resumo do Dia
        </Text>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>
              {totalCalories}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.gray }]}>
              kcal consumidas
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              2200
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.gray }]}>
              kcal meta
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              85/150
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.gray }]}>
              g proteínas
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {(Object.keys(mockMeals) as MealType[]).map((mealType) => (
          <MealSection
            key={mealType}
            title={mockMeals[mealType].title}
            foods={mockMeals[mealType].foods}
            totalCalories={mockMeals[mealType].totalCalories}
            onAddFood={() => handleAddFood(mealType)}
            onFoodPress={handleFoodPress}
          />
        ))}
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
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default MealDiaryScreen;
