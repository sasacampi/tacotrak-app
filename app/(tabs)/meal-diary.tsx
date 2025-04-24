"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import type { TabScreenProps } from "../../types/navigation";
import tacoData from "../../assets/taco.data.json";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

type FoodItem = {
  id: number | string;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  quantity?: number;
};

type MealFood = {
  id: number | string;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  quantity: number;
};

type Meal = {
  id: string;
  type: MealType;
  foods: MealFood[];
  isCollapsed: boolean;
};

type DayData = {
  date: Date;
  meals: Meal[];
};

const MealDiaryScreen = ({ navigation }: TabScreenProps<"MealDiary">) => {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayData, setDayData] = useState<DayData>({
    date: selectedDate,
    meals: [
      { id: "breakfast", type: "breakfast", foods: [], isCollapsed: false },
      { id: "lunch", type: "lunch", foods: [], isCollapsed: false },
      { id: "dinner", type: "dinner", foods: [], isCollapsed: false },
      { id: "snacks", type: "snacks", foods: [], isCollapsed: false },
    ],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    null
  );
  const [foodDetailModalVisible, setFoodDetailModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingSize, setServingSize] = useState(100);
  const [isCalorieGoalModalVisible, setIsCalorieGoalModalVisible] =
    useState(false);
  const [calorieGoal, setCalorieGoal] = useState("2350");
  const [isNutritionSummaryCollapsed, setIsNutritionSummaryCollapsed] =
    useState(false);

  const dailyTotals = {
    calories: dayData.meals.reduce(
      (total, meal) =>
        total +
        meal.foods.reduce((mealTotal, food) => mealTotal + food.calorias, 0),
      0
    ),
    carbs: dayData.meals.reduce(
      (total, meal) =>
        total +
        meal.foods.reduce(
          (mealTotal, food) => mealTotal + food.carboidratos,
          0
        ),
      0
    ),
    protein: dayData.meals.reduce(
      (total, meal) =>
        total +
        meal.foods.reduce((mealTotal, food) => mealTotal + food.proteinas, 0),
      0
    ),
    fat: 0,
  };

  const dailyGoals = {
    calories: Number.parseInt(calorieGoal, 10) || 2350,
    carbs: 250,
    protein: 120,
    fat: 40,
  };

  const remainingCalories = dailyGoals.calories - dailyTotals.calories;

  const generateWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - day + i);
      dates.push(date);
    }

    return dates;
  };

  const weekDates = generateWeekDates();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = tacoData.filter((food) =>
      food.nome.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddFood = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setIsSearchModalVisible(true);
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setFoodDetailModalVisible(true);
    setIsSearchModalVisible(false);
  };

  const handleAddToJournal = () => {
    if (selectedFood && selectedMealType) {
      // Calcular a proporção baseada em 100g (padrão da tabela TACO)
      const ratio = servingSize / 100;

      const adjustedFood: MealFood = {
        ...selectedFood,
        calorias: Math.round(selectedFood.calorias * ratio),
        carboidratos: Math.round(selectedFood.carboidratos * ratio * 10) / 10,
        proteinas: Math.round(selectedFood.proteinas * ratio * 10) / 10,
        quantity: servingSize,
      };

      setDayData((prevData) => {
        const updatedMeals = prevData.meals.map((meal) => {
          if (meal.type === selectedMealType) {
            return {
              ...meal,
              foods: [
                ...meal.foods,
                { ...adjustedFood, id: Date.now().toString() },
              ],
            };
          }
          return meal;
        });

        return {
          ...prevData,
          meals: updatedMeals,
        };
      });

      setFoodDetailModalVisible(false);
      setSelectedFood(null);
      setServingSize(100);
    }
  };

  const handleRemoveFood = (mealType: MealType, foodId: string | number) => {
    setDayData((prevData) => {
      const updatedMeals = prevData.meals.map((meal) => {
        if (meal.type === mealType) {
          return {
            ...meal,
            foods: meal.foods.filter((food) => food.id !== foodId),
          };
        }
        return meal;
      });

      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  const toggleMealCollapse = (mealType: MealType) => {
    setDayData((prevData) => {
      const updatedMeals = prevData.meals.map((meal) => {
        if (meal.type === mealType) {
          return {
            ...meal,
            isCollapsed: !meal.isCollapsed,
          };
        }
        return meal;
      });

      return {
        ...prevData,
        meals: updatedMeals,
      };
    });
  };

  const getMealTotals = (mealType: MealType) => {
    const meal = dayData.meals.find((m) => m.type === mealType);
    if (!meal) return { calories: 0, carbs: 0, protein: 0, fat: 0 };

    return {
      calories: meal.foods.reduce((total, food) => total + food.calorias, 0),
      carbs: meal.foods.reduce((total, food) => total + food.carboidratos, 0),
      protein: meal.foods.reduce((total, food) => total + food.proteinas, 0),
      fat: 0,
    };
  };

  const formatDate = (date: Date) => {
    return date.getDate().toString().padStart(2, "0");
  };

  const getDayName = (date: Date) => {
    const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    return days[date.getDay()];
  };

  const isDateSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveCalorieGoal = () => {
    setIsCalorieGoalModalVisible(false);
  };

  const getMealTitle = (mealType: MealType) => {
    switch (mealType) {
      case "breakfast":
        return "CAFÉ DA MANHÃ";
      case "lunch":
        return "ALMOÇO";
      case "dinner":
        return "JANTAR";
      case "snacks":
        return "LANCHES";
      default:
        return "";
    }
  };

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case "breakfast":
        return "coffee";
      case "lunch":
        return "sun";
      case "dinner":
        return "moon";
      case "snacks":
        return "pie-chart";
      default:
        return "circle";
    }
  };

  const renderMealSection = (mealType: MealType) => {
    const meal = dayData.meals.find((m) => m.type === mealType);
    const mealTotals = getMealTotals(mealType);
    const mealTitle = getMealTitle(mealType);

    if (!meal) return null;

    return (
      <View
        style={[
          styles.mealSection,
          { backgroundColor: "#FFFFFF", borderColor: "#ebedf8" },
        ]}
      >
        <TouchableOpacity
          style={styles.mealHeader}
          onPress={() => toggleMealCollapse(mealType)}
          activeOpacity={0.7}
        >
          <View style={styles.mealHeaderLeft}>
            <Text style={[styles.mealTitle, { color: "#3A3E4F" }]}>
              {mealTitle.toUpperCase()}
            </Text>
            <Text style={styles.mealCalories}>
              <Text style={{ fontWeight: "600" }}>{mealTotals.calories}</Text>
              <Text style={{ color: "#9fa0bc" }}> kcal</Text>
            </Text>
          </View>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#F0F1F5" }]}
              onPress={(e) => {
                e.stopPropagation();
                handleAddFood(mealType);
              }}
            >
              <Feather name="plus" size={18} color="#3A3E4F" />
            </TouchableOpacity>
            <Feather
              name={meal.isCollapsed ? "chevron-down" : "chevron-up"}
              size={20}
              color="#3A3E4F"
              style={styles.collapseIcon}
            />
          </View>
        </TouchableOpacity>

        {!meal.isCollapsed && (
          <View style={styles.mealContent}>
            {meal.foods.length > 0 ? (
              meal.foods.map((food) => (
                <View key={food.id} style={styles.foodItem}>
                  <View style={styles.foodItemLeft}>
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{food.nome}</Text>
                      <Text style={styles.foodCalories}>
                        {food.calorias} cals
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.itemButton, { backgroundColor: "#F0F1F5" }]}
                    onPress={() => handleRemoveFood(mealType, food.id)}
                  >
                    <Feather name="trash-2" size={14} color="#3A3E4F" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyMeal}>
                <Text style={[styles.emptyText, { color: "#9fa0bc" }]}>
                  Nenhum alimento adicionado
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#fc6a2d" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diário</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.calendarContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={weekDates}
          keyExtractor={(item) => item.toISOString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateItem,
                isDateSelected(item) && { backgroundColor: "#3A3E4F" },
              ]}
              onPress={() => handleDateSelect(item)}
            >
              <Text
                style={[
                  styles.dayName,
                  { color: isDateSelected(item) ? "#FFFFFF" : "#FFFFFF" },
                ]}
              >
                {getDayName(item)}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  { color: isDateSelected(item) ? "#FFFFFF" : "#FFFFFF" },
                ]}
              >
                {formatDate(item)}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.calendarContent}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alimento..."
            placeholderTextColor="#999"
            onFocus={() => {
              setIsSearchModalVisible(true);
              setSelectedMealType(null);
            }}
          />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderMealSection("breakfast")}
          {renderMealSection("lunch")}
          {renderMealSection("dinner")}
          {renderMealSection("snacks")}
        </ScrollView>

        <TouchableOpacity
          style={styles.nutritionSummaryToggle}
          onPress={() =>
            setIsNutritionSummaryCollapsed(!isNutritionSummaryCollapsed)
          }
        >
          <Feather
            name={isNutritionSummaryCollapsed ? "chevron-up" : "chevron-down"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {!isNutritionSummaryCollapsed && (
          <View
            style={[styles.nutritionSummary, { backgroundColor: "#FFFFFF" }]}
          >
            <View style={styles.caloriesSummary}>
              <View style={styles.caloriesTitleContainer}>
                <Text style={styles.caloriesTitle}>Calorias</Text>
                <TouchableOpacity
                  onPress={() => setIsCalorieGoalModalVisible(true)}
                >
                  <Feather name="edit-2" size={16} color="#999" />
                </TouchableOpacity>
              </View>
              <View style={styles.caloriesNumbers}>
                <Text style={styles.caloriesConsumed}>
                  {dailyTotals.calories}
                </Text>
                <Text style={styles.caloriesDivider}>/</Text>
                <Text style={styles.caloriesGoal}>{dailyGoals.calories}</Text>
              </View>
              <View style={styles.caloriesProgressContainer}>
                <View
                  style={[
                    styles.caloriesProgress,
                    {
                      width: `${Math.min(
                        100,
                        (dailyTotals.calories / dailyGoals.calories) * 100
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.macroSummary}>
              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Carboidratos</Text>
                <View style={styles.macroProgressContainer}>
                  <View
                    style={[
                      styles.macroProgress,
                      {
                        width: `${Math.min(
                          100,
                          (dailyTotals.carbs / dailyGoals.carbs) * 100
                        )}%`,
                        backgroundColor: "#3A3E4F",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.macroValue}>{dailyTotals.carbs}g</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Proteínas</Text>
                <View style={styles.macroProgressContainer}>
                  <View
                    style={[
                      styles.macroProgress,
                      {
                        width: `${Math.min(
                          100,
                          (dailyTotals.protein / dailyGoals.protein) * 100
                        )}%`,
                        backgroundColor: "#e950a3",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.macroValue}>{dailyTotals.protein}g</Text>
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroLabel}>Gorduras</Text>
                <View style={styles.macroProgressContainer}>
                  <View
                    style={[
                      styles.macroProgress,
                      {
                        width: `${Math.min(
                          100,
                          (dailyTotals.fat / dailyGoals.fat) * 100
                        )}%`,
                        backgroundColor: "#4CAF50",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.macroValue}>{dailyTotals.fat}g</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <Modal
        visible={isSearchModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: "#FFFFFF" }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedMealType
                  ? `Adicionar ao ${getMealTitle(
                      selectedMealType
                    ).toLowerCase()}`
                  : "Buscar alimentos"}
              </Text>
              <TouchableOpacity onPress={() => setIsSearchModalVisible(false)}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSearchContainer}>
              <Feather
                name="search"
                size={20}
                color="#999"
                style={styles.modalSearchIcon}
              />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Buscar alimentos..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch("")}>
                  <Feather name="x-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => handleSelectFood(item)}
                >
                  <View
                    style={[
                      styles.searchResultColorIndicator,
                      { backgroundColor: "#3A3E4F" },
                    ]}
                  />
                  <View style={styles.searchResultInfo}>
                    <Text style={styles.searchResultName}>{item.nome}</Text>
                    <Text style={styles.searchResultCalories}>
                      {item.calorias} kcal
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#CCC" />
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                searchQuery.length > 0 ? (
                  <Text style={styles.noResultsText}>
                    Nenhum alimento encontrado
                  </Text>
                ) : (
                  <Text style={styles.searchPromptText}>
                    Busque alimentos para adicionar
                  </Text>
                )
              }
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={foodDetailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFoodDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: "#FFFFFF" }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setFoodDetailModalVisible(false)}
              >
                <Feather name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nutrição</Text>
              <TouchableOpacity>
                <Feather name="heart" size={24} color="#e950a3" />
              </TouchableOpacity>
            </View>

            {selectedFood && (
              <>
                <Text style={styles.foodDetailName}>{selectedFood.nome}</Text>

                <View style={styles.foodDetailCalories}>
                  <Text style={styles.foodDetailCaloriesText}>
                    {Math.round(selectedFood.calorias * (servingSize / 100))}{" "}
                    kcal
                  </Text>
                </View>

                <View style={styles.servingSizeContainer}>
                  <Text style={styles.servingSizeLabel}>Gramas</Text>
                  <View style={styles.servingSizeSelector}>
                    <TouchableOpacity
                      style={styles.servingSizeButton}
                      onPress={() => {
                        const newValue = Math.max(1, servingSize - 10);
                        setServingSize(newValue);
                      }}
                    >
                      <Feather name="minus" size={20} color="#333" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.servingSizeInput}
                      keyboardType="numeric"
                      value={servingSize.toString()}
                      onChangeText={(text) => {
                        const value = Number.parseInt(text);
                        if (!isNaN(value) && value > 0) {
                          setServingSize(value);
                        } else if (text === "") {
                          setServingSize(0);
                        }
                      }}
                    />
                    <Text style={styles.servingSizeUnit}>g</Text>
                    <TouchableOpacity
                      style={styles.servingSizeButton}
                      onPress={() => {
                        const newValue = servingSize + 10;
                        setServingSize(newValue);
                      }}
                    >
                      <Feather name="plus" size={20} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.nutritionFactsContainer}>
                  <Text style={styles.nutritionFactsTitle}>
                    Informação Nutricional
                  </Text>

                  <View style={styles.macroCirclesContainer}>
                    <View style={styles.macroCircle}>
                      <View
                        style={[
                          styles.macroCircleInner,
                          { borderColor: "#3A3E4F" },
                        ]}
                      >
                        {selectedFood && (
                          <Text style={styles.macroCirclePercent}>
                            {Math.round(
                              (selectedFood.carboidratos /
                                (selectedFood.carboidratos +
                                  selectedFood.proteinas +
                                  2)) *
                                100
                            )}
                            %
                          </Text>
                        )}
                      </View>
                      <Text style={styles.macroCircleLabel}>Carboidratos</Text>
                      <Text style={styles.macroCircleValue}>
                        {(
                          selectedFood?.carboidratos *
                          (servingSize / 100)
                        ).toFixed(1)}
                        g
                      </Text>
                    </View>

                    <View style={styles.macroCircle}>
                      <View
                        style={[
                          styles.macroCircleInner,
                          { borderColor: "#fc6a2d" },
                        ]}
                      >
                        {selectedFood && (
                          <Text style={styles.macroCirclePercent}>
                            {Math.round(
                              (selectedFood.proteinas /
                                (selectedFood.carboidratos +
                                  selectedFood.proteinas +
                                  2)) *
                                100
                            )}
                            %
                          </Text>
                        )}
                      </View>
                      <Text style={styles.macroCircleLabel}>Proteínas</Text>
                      <Text style={styles.macroCircleValue}>
                        {(
                          selectedFood?.proteinas *
                          (servingSize / 100)
                        ).toFixed(1)}
                        g
                      </Text>
                    </View>

                    <View style={styles.macroCircle}>
                      <View
                        style={[
                          styles.macroCircleInner,
                          { borderColor: "#4CAF50" },
                        ]}
                      >
                        {selectedFood && (
                          <Text style={styles.macroCirclePercent}>
                            {Math.round(
                              (2 /
                                (selectedFood.carboidratos +
                                  selectedFood.proteinas +
                                  2)) *
                                100
                            )}
                            %
                          </Text>
                        )}
                      </View>
                      <Text style={styles.macroCircleLabel}>Gorduras</Text>
                      <Text style={styles.macroCircleValue}>
                        {((selectedFood ? 2 : 0) * (servingSize / 100)).toFixed(
                          1
                        )}
                        g
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.addToJournalButton,
                    { backgroundColor: "#3A3E4F" },
                  ]}
                  onPress={handleAddToJournal}
                >
                  <Text style={styles.addToJournalButtonText}>
                    Adicionar ao diário
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isCalorieGoalModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCalorieGoalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: "#FFFFFF", height: "auto" },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Meta de Calorias</Text>
              <TouchableOpacity
                onPress={() => setIsCalorieGoalModalVisible(false)}
              >
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.calorieGoalLabel}>Meta diária de calorias</Text>
            <TextInput
              style={styles.calorieGoalInput}
              keyboardType="numeric"
              value={calorieGoal}
              onChangeText={setCalorieGoal}
            />

            <TouchableOpacity
              style={[
                styles.saveCalorieGoalButton,
                { backgroundColor: "#3A3E4F" },
              ]}
              onPress={handleSaveCalorieGoal}
            >
              <Text style={styles.saveCalorieGoalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
  calendarContainer: {
    marginBottom: 10,
  },
  calendarContent: {
    paddingHorizontal: 15,
  },
  dateItem: {
    width: 45,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 25,
  },
  dayName: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mealSection: {
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#f8f9fe",
    borderWidth: 1,
    borderColor: "#ebedf8",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  mealHeaderLeft: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.5,
    color: "#6b6edc",
  },
  mealCalories: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9eaff",
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ebedf8",
  },
  foodItemLeft: {
    flex: 1,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  },
  foodCalories: {
    fontSize: 13,
    color: "#9fa0bc",
    fontFamily: "Poppins-Regular",
  },
  itemButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "#e9eaff",
  },
  emptyMeal: {
    alignItems: "center",
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#9fa0bc",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  nutritionSummaryToggle: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nutritionSummary: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  caloriesSummary: {
    marginBottom: 15,
  },
  caloriesTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  caloriesTitle: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  caloriesNumbers: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  caloriesConsumed: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fc6a2d",
    fontFamily: "Poppins-Bold",
  },
  caloriesDivider: {
    fontSize: 16,
    color: "#999",
    marginHorizontal: 5,
  },
  caloriesGoal: {
    fontSize: 16,
    color: "#999",
    fontFamily: "Poppins-Regular",
  },
  caloriesProgressContainer: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  caloriesProgress: {
    height: "100%",
    backgroundColor: "#fc6a2d",
    borderRadius: 4,
  },
  macroSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  macroLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  macroProgressContainer: {
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    marginBottom: 5,
    overflow: "hidden",
  },
  macroProgress: {
    height: "100%",
    borderRadius: 2,
  },
  macroValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  modalSearchIcon: {
    marginRight: 10,
  },
  modalSearchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  searchResultColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF8A65",
    marginRight: 15,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Poppins-Medium",
  },
  searchResultCalories: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  noResultsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Poppins-Regular",
  },
  searchPromptText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "Poppins-Regular",
  },
  foodDetailName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  foodDetailCalories: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  foodDetailCaloriesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3A3E4F",
    marginLeft: 5,
    fontFamily: "Poppins-SemiBold",
  },
  servingSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  servingSizeLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  servingSizeSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  servingSizeButton: {
    padding: 10,
  },
  servingSizeInput: {
    width: 50,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  servingSizeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginHorizontal: 15,
    fontFamily: "Poppins-Medium",
  },
  nutritionFactsContainer: {
    marginBottom: 20,
  },
  nutritionFactsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    fontFamily: "Poppins-SemiBold",
  },
  macroCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  macroCircle: {
    alignItems: "center",
  },
  macroCircleInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  macroCirclePercent: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  macroCircleLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  macroCircleValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    fontFamily: "Poppins-Medium",
  },
  addToJournalButton: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addToJournalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
  calorieGoalLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
  },
  calorieGoalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  saveCalorieGoalButton: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  saveCalorieGoalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
  },
  servingSizeUnit: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
    fontFamily: "Poppins-Medium",
  },
  mealContent: {
    marginTop: 8,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  collapseIcon: {
    marginLeft: 12,
  },
});

export default MealDiaryScreen;
