"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./context/ThemeContext";
import tacoData from "../assets/taco.data.json";

interface FoodItem {
  id: number;
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
}

interface MealEntry {
  id: string;
  food: FoodItem;
  quantity: number;
  mealType: string;
}

const MealDiary = () => {
  const { colors } = useTheme();
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [foodDetailModalVisible, setFoodDetailModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("100");
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);

  const handleMealTypeSelect = (mealType: string) => {
    setSelectedMealType(mealType);
    setIsSearchModalVisible(true);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = tacoData.filter((food) =>
      food.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setFoodDetailModalVisible(true);
    setIsSearchModalVisible(false);
  };

  const handleAddToJournal = () => {
    if (!selectedFood || !selectedMealType) return;

    const newEntry: MealEntry = {
      id: Date.now().toString(),
      food: selectedFood,
      quantity: Number.parseInt(quantity, 10) || 100,
      mealType: selectedMealType,
    };

    setMealEntries((prev) => [...prev, newEntry]);
    setFoodDetailModalVisible(false);
    setSelectedFood(null);
    setQuantity("100");
  };

  const getMealTitle = (mealType: string): string => {
    switch (mealType) {
      case "breakfast":
        return "Café da Manhã";
      case "lunch":
        return "Almoço";
      case "dinner":
        return "Jantar";
      case "snack":
        return "Lanche";
      default:
        return mealType;
    }
  };

  const calculateNutrients = (food: FoodItem, grams: number) => {
    const ratio = grams / 100;
    return {
      calories: Math.round(food.calorias * ratio),
      protein: Math.round(food.proteinas * ratio * 10) / 10,
      carbs: Math.round(food.carboidratos * ratio * 10) / 10,
      // Estimativa para gorduras, já que não temos esse dado
      fat: Math.round(((food.calorias * 0.2) / 9) * ratio * 10) / 10,
    };
  };

  const calculateMacroPercentages = (
    protein: number,
    carbs: number,
    fat: number
  ) => {
    const total = protein + carbs + fat;
    if (total === 0)
      return { proteinPercentage: 0, carbsPercentage: 0, fatPercentage: 0 };

    return {
      proteinPercentage: Math.round((protein / total) * 100),
      carbsPercentage: Math.round((carbs / total) * 100),
      fatPercentage: Math.round((fat / total) * 100),
    };
  };

  const renderSearchResult = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleSelectFood(item)}
    >
      <View style={styles.searchResultColorIndicator} />
      <View style={styles.searchResultInfo}>
        <Text style={styles.searchResultName}>{item.nome}</Text>
        <Text style={styles.searchResultCalories}>{item.calorias} kcal</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Diário Alimentar</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mealTypesContainer}>
          <TouchableOpacity
            style={[styles.mealTypeButton, { backgroundColor: "#e950a3" }]}
            onPress={() => handleMealTypeSelect("breakfast")}
          >
            <Text style={styles.mealTypeButtonText}>
              {getMealTitle("breakfast")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mealTypeButton, { backgroundColor: "#e950a3" }]}
            onPress={() => handleMealTypeSelect("lunch")}
          >
            <Text style={styles.mealTypeButtonText}>
              {getMealTitle("lunch")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mealTypeButton, { backgroundColor: "#e950a3" }]}
            onPress={() => handleMealTypeSelect("dinner")}
          >
            <Text style={styles.mealTypeButtonText}>
              {getMealTitle("dinner")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mealTypeButton, { backgroundColor: "#e950a3" }]}
            onPress={() => handleMealTypeSelect("snack")}
          >
            <Text style={styles.mealTypeButtonText}>
              {getMealTitle("snack")}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Entradas Recentes</Text>
        {mealEntries.length > 0 ? (
          mealEntries.map((entry) => (
            <View key={entry.id} style={styles.mealEntry}>
              <Text style={styles.mealEntryText}>
                {getMealTitle(entry.mealType)}: {entry.food.nome} (
                {entry.quantity}g)
              </Text>
              <Text style={styles.mealEntryCalories}>
                {calculateNutrients(entry.food, entry.quantity).calories} kcal
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum alimento adicionado ainda</Text>
        )}
      </ScrollView>

      {/* Modal de Busca */}
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
                  ? `Adicionar ao ${getMealTitle(selectedMealType)}`
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
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                autoFocus
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Feather name="x-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>

            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSearchResult}
              ListEmptyComponent={
                searchText.length > 0 ? (
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

      {/* Modal de Detalhes do Alimento */}
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
              <View style={{ width: 24 }} />
            </View>

            {selectedFood && (
              <>
                <Text style={styles.foodDetailName}>{selectedFood.nome}</Text>

                <View style={styles.foodDetailCalories}>
                  <Text style={styles.foodDetailCaloriesText}>
                    {
                      calculateNutrients(
                        selectedFood,
                        Number.parseInt(quantity) || 100
                      ).calories
                    }{" "}
                    kcal
                  </Text>
                </View>

                <View style={styles.servingSizeContainer}>
                  <Text style={styles.servingSizeLabel}>Gramas</Text>
                  <View style={styles.servingSizeSelector}>
                    <TouchableOpacity
                      style={styles.servingSizeButton}
                      onPress={() => {
                        const newValue = Math.max(
                          10,
                          Number.parseInt(quantity) - 10
                        );
                        setQuantity(newValue.toString());
                      }}
                    >
                      <Feather name="minus" size={20} color="#333" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.servingSizeInput}
                      keyboardType="numeric"
                      value={quantity}
                      onChangeText={setQuantity}
                    />
                    <Text style={styles.servingSizeUnit}>g</Text>
                    <TouchableOpacity
                      style={styles.servingSizeButton}
                      onPress={() => {
                        const newValue = (Number.parseInt(quantity) || 0) + 10;
                        setQuantity(newValue.toString());
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

                  {(() => {
                    const nutrients = calculateNutrients(
                      selectedFood,
                      Number.parseInt(quantity) || 100
                    );
                    const {
                      proteinPercentage,
                      carbsPercentage,
                      fatPercentage,
                    } = calculateMacroPercentages(
                      nutrients.protein,
                      nutrients.carbs,
                      nutrients.fat
                    );

                    return (
                      <View style={styles.macroCirclesContainer}>
                        <View style={styles.macroCircle}>
                          <View
                            style={[
                              styles.macroCircleInner,
                              { borderColor: "#FF8A65" },
                            ]}
                          >
                            <Text style={styles.macroCirclePercent}>
                              {carbsPercentage}%
                            </Text>
                          </View>
                          <Text style={styles.macroCircleLabel}>
                            Carboidratos
                          </Text>
                          <Text style={styles.macroCircleValue}>
                            {nutrients.carbs}g
                          </Text>
                        </View>

                        <View style={styles.macroCircle}>
                          <View
                            style={[
                              styles.macroCircleInner,
                              { borderColor: "#e950a3" },
                            ]}
                          >
                            <Text style={styles.macroCirclePercent}>
                              {proteinPercentage}%
                            </Text>
                          </View>
                          <Text style={styles.macroCircleLabel}>Proteínas</Text>
                          <Text style={styles.macroCircleValue}>
                            {nutrients.protein}g
                          </Text>
                        </View>

                        <View style={styles.macroCircle}>
                          <View
                            style={[
                              styles.macroCircleInner,
                              { borderColor: "#4CAF50" },
                            ]}
                          >
                            <Text style={styles.macroCirclePercent}>
                              {fatPercentage}%
                            </Text>
                          </View>
                          <Text style={styles.macroCircleLabel}>Gorduras</Text>
                          <Text style={styles.macroCircleValue}>
                            {nutrients.fat}g
                          </Text>
                        </View>
                      </View>
                    );
                  })()}
                </View>

                <TouchableOpacity
                  style={[
                    styles.addToJournalButton,
                    { backgroundColor: "#e950a3" },
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  mealTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mealTypeButton: {
    width: "48%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  mealTypeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  mealEntry: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealEntryText: {
    fontSize: 16,
    color: "#333",
  },
  mealEntryCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e950a3",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
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
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  modalSearchIcon: {
    marginRight: 10,
  },
  modalSearchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#e950a3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  },
  searchResultCalories: {
    fontSize: 14,
    color: "#666",
  },
  noResultsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
  },
  searchPromptText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 30,
  },
  foodDetailName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  foodDetailCalories: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  foodDetailCaloriesText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#e950a3",
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
  },
  servingSizeUnit: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
  },
  nutritionFactsContainer: {
    marginBottom: 20,
  },
  nutritionFactsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
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
  },
  macroCircleLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  macroCircleValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
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
  },
});

export default MealDiary;
