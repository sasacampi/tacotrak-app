import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
  AddFood: { mealType?: string };
  FoodDetail: { food: any };
  TDEECalculator: undefined;
  MealDiary: undefined;
  Profile: undefined;
};
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface ScreenProps {
  navigation: AppNavigationProp;
  route: any;
}
