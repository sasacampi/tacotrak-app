import { Slot } from "expo-router";
import { ThemeProvider } from "@/app/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
