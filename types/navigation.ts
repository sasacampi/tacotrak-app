import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

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

export type AppNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type AppRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: AppNavigationProp<T>;
  route: AppRouteProp<T>;
}
