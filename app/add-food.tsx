"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContent";
import FoodItem from "../components/FoodItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

// Type definitions
type FoodItemType = {
  id: string;
  name: string;
  calories: number;
  portion: string;
  category: string;
};

type AddFoodScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "AddFood">;
  route: {
    params?: {
      mealType?: string;
    };
  };
};

// Mock data for TACO foods
const mockFoods: FoodItemType[] = [
  {
    id: "1",
    name: "Arroz, tipo 1, cozido",
    calories: 128,
    portion: "100g",
    category: "Cereais",
  },
  {
    id: "2",
    name: "Feijão, carioca, cozido",
    calories: 76,
    portion: "100g",
    category: "Leguminosas",
  },
  {
    id: "3",
    name: "Peito de frango, sem pele, grelhado",
    calories: 159,
    portion: "100g",
    category: "Carnes",
  },
  {
    id: "4",
    name: "Banana, prata",
    calories: 98,
    portion: "100g",
    category: "Frutas",
  },
  {
    id: "5",
    name: "Leite, integral",
    calories: 61,
    portion: "100ml",
    category: "Laticínios",
  },
  {
    id: "6",
    name: "Pão, francês",
    calories: 300,
    portion: "100g",
    category: "Cereais",
  },
  {
    id: "7",
    name: "Batata, inglesa, cozida",
    calories: 52,
    portion: "100g",
    category: "Vegetais",
  },
  {
    id: "8",
    name: "Ovo, de galinha, inteiro, cozido",
    calories: 146,
    portion: "100g",
    category: "Ovos",
  },
  {
    id: "9",
    name: "Maçã, com casca",
    calories: 63,
    portion: "100g",
    category: "Frutas",
  },
  {
    id: "10",
    name: "Alface, crespa, crua",
    calories: 11,
    portion: "100g",
    category: "Vegetais",
  },
];

const categories = [
  "Todos",
  "Cereais",
  "Leguminosas",
  "Carnes",
  "Frutas",
  "Laticínios",
  "Vegetais",
  "Ovos",
] as const;

type Category = (typeof categories)[number];

const AddFoodScreen = ({ navigation, route }: AddFoodScreenProps) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos");

  const filteredFoods = mockFoods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFoodPress = (food: FoodItemType) => {
    navigation.navigate("FoodDetail", { food });
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
          Adicionar Alimento
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
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
              <Feather name="x" size={20} color={colors.gray} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategory === item ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        selectedCategory === item ? "#FFFFFF" : colors.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodItem
              name={item.name}
              calories={item.calories}
              portion={item.portion}
              onPress={() => handleFoodPress(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="search" size={48} color={colors.gray} />
              <Text style={[styles.emptyText, { color: colors.gray }]}>
                Nenhum alimento encontrado
              </Text>
            </View>
          }
          contentContainerStyle={styles.foodsList}
        />
      </View>
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
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  foodsList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default AddFoodScreen;
