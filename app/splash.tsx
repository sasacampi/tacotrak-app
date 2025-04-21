"use client";

import { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
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
    <View style={[styles.container, { backgroundColor: "#e950a3" }]}>
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
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: "100%",
    height: "100%",
    tintColor: "#FFFFFF",
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Poppins-Regular",
  },
});

export default SplashScreen;
