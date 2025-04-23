import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlturaScreen from "./altura";
import GeneroScreen from "./genero";
import IdadeScreen from "./idade";
import PesoScreen from "./peso";

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Altura"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Altura" component={AlturaScreen} />
      <Stack.Screen name="Genero" component={GeneroScreen} />
      <Stack.Screen name="Idade" component={IdadeScreen} />
      <Stack.Screen name="Peso" component={PesoScreen} />
    </Stack.Navigator>
  );
}
