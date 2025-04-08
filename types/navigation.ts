import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

// Tipo para os itens alimentares
export type FoodItem = {
  id: string;
  name: string;
  calories: number;
  portion?: string;
  category?: string;
  protein?: number;
  carbs?: number;
  fat?: number;
};

// Lista de telas e seus parâmetros
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
  AddFood: { mealType?: string };
  FoodDetail: { food: FoodItem };
  TDEECalculator: undefined;
  MealDiary: undefined;
  Profile: undefined;
};

// Tipos de navegação e rota
export type AppNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type AppRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Tipo genérico para props de uma tela
export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: AppNavigationProp<T>;
  route: AppRouteProp<T>;
}

// Tipo específico para a tela MealDiary
export type MealDiaryScreenProps = ScreenProps<"MealDiary">;
