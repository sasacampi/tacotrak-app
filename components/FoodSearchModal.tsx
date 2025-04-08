"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";
import foodDatabase from "../data/food-database";

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  portion: string;
  portionWeight: number;
};

type FoodSearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectFood: (food: FoodItem, grams: number) => void;
};

const FoodSearchModal: React.FC<FoodSearchModalProps> = ({
  visible,
  onClose,
  onSelectFood,
}) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState("100");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFoods([]);
      return;
    }

    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const filtered = foodDatabase.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(filtered);
      setLoading(false);
    }, 300);
  }, [searchQuery]);

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setQuantity("100");
  };

  const handleConfirm = () => {
    if (selectedFood) {
      const grams = Number.parseInt(quantity) || 0;
      onSelectFood(selectedFood, grams);
      resetModal();
    }
  };

  const resetModal = () => {
    setSelectedFood(null);
    setSearchQuery("");
    setQuantity("100");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity((prev) => (Number.parseInt(prev) + 10).toString());
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(10, Number.parseInt(prev) - 10).toString());
  };

  const calculateNutrients = (food: FoodItem, grams: number) => {
    const ratio = grams / food.portionWeight;
    return {
      calories: Math.round(food.calories * ratio),
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      protein: Math.round(food.protein * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
    };
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedFood ? "Adicionar Alimento" : "Buscar Alimento"}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Feather name="x" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {!selectedFood ? (
            <>
              <View
                style={[
                  styles.searchContainer,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Feather name="search" size={20} color={colors.gray} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder="Buscar alimento..."
                  placeholderTextColor={colors.gray}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x-circle" size={20} color={colors.gray} />
                  </TouchableOpacity>
                )}
              </View>

              {loading ? (
                <ActivityIndicator
                  style={styles.loading}
                  color={colors.primary}
                  size="large"
                />
              ) : (
                <FlatList
                  data={filteredFoods}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.foodItem,
                        { borderBottomColor: colors.border },
                      ]}
                      onPress={() => handleSelectFood(item)}
                    >
                      <View>
                        <Text style={[styles.foodName, { color: colors.text }]}>
                          {item.name}
                        </Text>
                        <Text
                          style={[styles.foodPortion, { color: colors.gray }]}
                        >
                          {item.portion}
                        </Text>
                      </View>
                      <View style={styles.foodCalories}>
                        <Text
                          style={[
                            styles.caloriesText,
                            { color: colors.primary },
                          ]}
                        >
                          {item.calories} kcal
                        </Text>
                        <Text
                          style={[styles.macrosText, { color: colors.gray }]}
                        >
                          C: {item.carbs}g | P: {item.protein}g | G: {item.fat}g
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    searchQuery.trim() !== "" ? (
                      <Text style={[styles.emptyText, { color: colors.gray }]}>
                        Nenhum alimento encontrado
                      </Text>
                    ) : null
                  }
                />
              )}
            </>
          ) : (
            <View style={styles.foodDetailContainer}>
              <Text style={[styles.selectedFoodName, { color: colors.text }]}>
                {selectedFood.name}
              </Text>
              <Text
                style={[styles.selectedFoodPortion, { color: colors.gray }]}
              >
                {selectedFood.portion}
              </Text>

              <View style={styles.quantitySelector}>
                <Text style={[styles.quantityLabel, { color: colors.text }]}>
                  Quantidade (g):
                </Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      { backgroundColor: colors.border },
                    ]}
                    onPress={decrementQuantity}
                  >
                    <Feather name="minus" size={20} color={colors.text} />
                  </TouchableOpacity>
                  <TextInput
                    style={[
                      styles.quantityInput,
                      {
                        color: colors.text,
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                    ]}
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={(text) => {
                      // Only allow numbers
                      const numericValue = text.replace(/[^0-9]/g, "");
                      setQuantity(numericValue);
                    }}
                  />
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      { backgroundColor: colors.border },
                    ]}
                    onPress={incrementQuantity}
                  >
                    <Feather name="plus" size={20} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={[
                  styles.nutritionCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.nutritionTitle, { color: colors.text }]}>
                  Informação Nutricional
                </Text>
                <Text
                  style={[styles.nutritionSubtitle, { color: colors.gray }]}
                >
                  Para {quantity}g
                </Text>

                {selectedFood && (
                  <>
                    <View style={styles.nutrientRow}>
                      <Text
                        style={[styles.nutrientLabel, { color: colors.text }]}
                      >
                        Calorias:
                      </Text>
                      <Text
                        style={[
                          styles.nutrientValue,
                          { color: colors.primary },
                        ]}
                      >
                        {
                          calculateNutrients(
                            selectedFood,
                            Number.parseInt(quantity) || 0
                          ).calories
                        }{" "}
                        kcal
                      </Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text
                        style={[styles.nutrientLabel, { color: colors.text }]}
                      >
                        Carboidratos:
                      </Text>
                      <Text
                        style={[styles.nutrientValue, { color: colors.text }]}
                      >
                        {
                          calculateNutrients(
                            selectedFood,
                            Number.parseInt(quantity) || 0
                          ).carbs
                        }
                        g
                      </Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text
                        style={[styles.nutrientLabel, { color: colors.text }]}
                      >
                        Proteínas:
                      </Text>
                      <Text
                        style={[styles.nutrientValue, { color: colors.text }]}
                      >
                        {
                          calculateNutrients(
                            selectedFood,
                            Number.parseInt(quantity) || 0
                          ).protein
                        }
                        g
                      </Text>
                    </View>
                    <View style={styles.nutrientRow}>
                      <Text
                        style={[styles.nutrientLabel, { color: colors.text }]}
                      >
                        Gorduras:
                      </Text>
                      <Text
                        style={[styles.nutrientValue, { color: colors.text }]}
                      >
                        {
                          calculateNutrients(
                            selectedFood,
                            Number.parseInt(quantity) || 0
                          ).fat
                        }
                        g
                      </Text>
                    </View>
                  </>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    padding: 4,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  foodPortion: {
    fontSize: 14,
  },
  foodCalories: {
    alignItems: "flex-end",
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: "500",
  },
  macrosText: {
    fontSize: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  loading: {
    marginTop: 40,
  },
  foodDetailContainer: {
    flex: 1,
  },
  selectedFoodName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  selectedFoodPortion: {
    fontSize: 16,
    marginBottom: 24,
  },
  quantitySelector: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  quantityInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 12,
    textAlign: "center",
    fontSize: 16,
  },
  nutritionCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  nutritionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 16,
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FoodSearchModal;
