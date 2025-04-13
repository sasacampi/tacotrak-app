import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./app/context/ThemeContext";
import { AuthProvider } from "./app/context/AuthContext";
import { MealsProvider } from "./app/context/MealsContext";
import SplashScreen from "./app/splash";
import LoginScreen from "./app/login";
import RegisterScreen from "./app/registerscreen";
import OnboardingScreen from "./app/onboardingscreen";
import DashboardScreen from "./app/(tabs)/index";
import AddFoodScreen from "./app/add-food";
import FoodDetailScreen from "./app/food-detail";
import TDEECalculatorScreen from "./app/(tabs)/tdee";
import MealDiaryScreen from "./app/(tabs)/meal-diary";
import ProfileScreen from "./app/(tabs)/profile";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View } from "react-native";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList, MainTabParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const options: BottomTabNavigationOptions = {
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Feather.glyphMap = "home";

            if (route.name === "Dashboard") {
              iconName = "home";
            } else if (route.name === "MealDiary") {
              iconName = "book";
            } else if (route.name === "AddFood") {
              iconName = "plus-circle";
            } else if (route.name === "Macros") {
              iconName = "bar-chart-2";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#5E60CE",
          tabBarInactiveTintColor: "#9E9E9E",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontFamily: "Poppins-Regular",
            fontSize: 12,
          },
        };
        return options;
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="MealDiary"
        component={MealDiaryScreen}
        options={{ title: "Diary" }}
      />
      <Tab.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{
          tabBarButton: (props) => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#5E60CE",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                }}
              >
                <Feather name="plus" size={24} color="#FFFFFF" />
              </View>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Macros" component={TDEECalculatorScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <MealsProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="AddFood" component={AddFoodScreen} />
                <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </MealsProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
