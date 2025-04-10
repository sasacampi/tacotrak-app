"use client";

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
import ProgressRing from "../../components/ProgressRing";
import Button from "../../components/Button";
import type { ScreenProps } from "../../types/navigation";

const DashboardScreen = ({ navigation }: ScreenProps<"Dashboard">) => {
  const { colors } = useTheme();

  // Mock data
  const dailyGoal = 2000;
  const consumed = 1200;
  const remaining = dailyGoal - consumed;
  const progress = consumed / dailyGoal;

  const macros = {
    protein: { current: 85, target: 130, color: "#FF6B6B" },
    carbs: { current: 145, target: 250, color: "#4ECDC4" },
    fat: { current: 35, target: 65, color: "#FFD166" },
  };

  const meals = [
    {
      id: "1",
      type: "Breakfast",
      name: "Oatmeal with fruits",
      calories: 320,
      icon: "coffee",
    },
    {
      id: "2",
      type: "Lunch",
      name: "Grilled chicken salad",
      calories: 450,
      icon: "clipboard",
    },
    {
      id: "3",
      type: "Snack",
      name: "Apple and almonds",
      calories: 180,
      icon: "package",
    },
  ];

  const handleAddMeal = () => {
    navigation.navigate({ name: "AddFood", params: {} }); // ou { mealType: "Lunch" } por exemplo
  };

  const handleViewDiary = () => {
    navigation.navigate({ name: "MealDiary", params: undefined });
  };

  const handleViewProfile = () => {
    navigation.navigate({ name: "Profile", params: undefined });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Olá, User!
            </Text>
            <Text style={[styles.subtitle, { color: colors.gray }]}>
              Monitore suas calorias do dia.
            </Text>
          </View>
          <TouchableOpacity onPress={handleViewProfile}>
            <View
              style={[
                styles.profileButton,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Feather name="user" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.calorieCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.calorieContent}>
            <View style={styles.ringContainer}>
              <ProgressRing
                progress={progress}
                size={140}
                strokeWidth={12}
                text={`${consumed}`}
                subText="of ${dailyGoal} kcal"
                color={colors.primary}
              />
            </View>

            <View style={styles.macrosContainer}>
              <View style={styles.macroItem}>
                <Text
                  style={[styles.macroValue, { color: macros.protein.color }]}
                >
                  {macros.protein.current}g
                  <Text style={[styles.macroTarget, { color: colors.gray }]}>
                    /{macros.protein.target}g
                  </Text>
                </Text>
                <Text style={[styles.macroLabel, { color: colors.text }]}>
                  Protein
                </Text>
              </View>

              <View style={styles.macroItem}>
                <Text
                  style={[styles.macroValue, { color: macros.carbs.color }]}
                >
                  {macros.carbs.current}g
                  <Text style={[styles.macroTarget, { color: colors.gray }]}>
                    /{macros.carbs.target}g
                  </Text>
                </Text>
                <Text style={[styles.macroLabel, { color: colors.text }]}>
                  Carbs
                </Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={[styles.macroValue, { color: macros.fat.color }]}>
                  {macros.fat.current}g
                  <Text style={[styles.macroTarget, { color: colors.gray }]}>
                    /{macros.fat.target}g
                  </Text>
                </Text>
                <Text style={[styles.macroLabel, { color: colors.text }]}>
                  Fat
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Today's Meals
            </Text>
            <TouchableOpacity onPress={handleViewDiary}>
              <Text style={[styles.sectionAction, { color: colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={[
                styles.mealCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
              onPress={() => navigation.navigate("MealDiary")}
            >
              <View
                style={[
                  styles.mealIconContainer,
                  { backgroundColor: colors.primary + "15" },
                ]}
              >
                <Feather name={meal.icon} size={18} color={colors.primary} />
              </View>
              <View style={styles.mealInfo}>
                <Text style={[styles.mealType, { color: colors.gray }]}>
                  {meal.type}
                </Text>
                <Text style={[styles.mealName, { color: colors.text }]}>
                  {meal.name}
                </Text>
              </View>
              <Text style={[styles.mealCalories, { color: colors.primary }]}>
                {meal.calories}
                <Text style={[styles.mealCaloriesUnit, { color: colors.gray }]}>
                  {" "}
                  kcal
                </Text>
              </Text>
            </TouchableOpacity>
          ))}

          <Button
            title="Add Meal"
            onPress={handleAddMeal}
            icon={<Feather name="plus" size={18} color="#FFF" />}
            style={styles.addMealButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  calorieCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calorieContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ringContainer: {
    flex: 1,
    alignItems: "center",
  },
  macrosContainer: {
    flex: 1,
    marginLeft: 16,
  },
  macroItem: {
    marginBottom: 16,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  macroTarget: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  macroLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  mealsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  sectionAction: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  mealIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  mealName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  mealCaloriesUnit: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  addMealButton: {
    marginTop: 8,
  },
});

export default DashboardScreen;
