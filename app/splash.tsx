"use client";

import { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./context/ThemeContext";
import type { ScreenProps } from "../types/navigation";

const SplashScreen = ({ navigation }: ScreenProps) => {
  const { colors } = useTheme();
  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
    ]).start(() => {
      // Navigate to Login screen after animation completes
      navigation.replace("Login");
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Feather name="activity" size={60} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>TacoTrak</Text>
        <Text style={styles.tagline}>Rastreamento nutricional inteligente</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
  },
});

export default SplashScreen;
