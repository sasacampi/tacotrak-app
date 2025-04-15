import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

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
  MainTabs: {
    screen: keyof MainTabParamList;
  };
  AddFood: { mealType?: string };
  FoodDetail: { foodId: string };
  TDEECalculator: undefined;
  Profile: undefined;
  MealDiary: { date: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  MealDiary: { date: string };
  AddFood: undefined;
  Macros: undefined;
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

export type TabNavigationProp<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export interface TabScreenProps<T extends keyof MainTabParamList> {
  navigation: TabNavigationProp<T>["navigation"];
  route: TabNavigationProp<T>["route"];
}

export type MealDiaryScreenProps = TabScreenProps<"MealDiary">;
export type DashboardScreenProps = TabScreenProps<"Dashboard">;
export type ProfileScreenProps = TabScreenProps<"Profile">;
export type TDEECalculatorScreenProps = TabScreenProps<"Macros">;
export type AddFoodScreenProps =
  | TabScreenProps<"AddFood">
  | ScreenProps<"AddFood">;
