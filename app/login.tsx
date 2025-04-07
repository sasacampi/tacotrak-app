"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContent";
import Button from "../components/Button";
import type { ScreenProps } from "../types/navigation";

const LoginScreen = ({ navigation }: ScreenProps) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock credentials for demo
  const mockCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  const handleLogin = () => {
    setError("");
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (
        email === mockCredentials.email &&
        password === mockCredentials.password
      ) {
        setIsLoading(false);
        navigation.navigate("Onboarding");
      } else {
        setIsLoading(false);
        setError("Email ou senha inválidos. Tente novamente.");
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to a password reset screen
    alert("Um email de recuperação seria enviado para: " + email);
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View
              style={[styles.logoCircle, { backgroundColor: colors.primary }]}
            >
              <Feather name="activity" size={40} color="#FFFFFF" />
            </View>
            <Text style={[styles.logoText, { color: colors.primary }]}>
              TacoTrak
            </Text>
            <Text style={[styles.tagline, { color: colors.text }]}>
              Rastreamento nutricional inteligente
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.formTitle, { color: colors.text }]}>
              Login
            </Text>

            {error ? (
              <View
                style={[
                  styles.errorContainer,
                  {
                    backgroundColor: colors.danger + "20",
                    borderColor: colors.danger,
                  },
                ]}
              >
                <Feather name="alert-circle" size={16} color={colors.danger} />
                <Text style={[styles.errorText, { color: colors.danger }]}>
                  {error}
                </Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Feather
                  name="mail"
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Seu email"
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Senha
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Feather
                  name="lock"
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Sua senha"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text
                style={[styles.forgotPasswordText, { color: colors.primary }]}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            <View style={styles.dividerContainer}>
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
              <Text style={[styles.dividerText, { color: colors.gray }]}>
                OU
              </Text>
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
            </View>

            <Button
              title="Criar uma conta"
              onPress={handleRegister}
              variant="outline"
              style={styles.registerButton}
            />

            <Text style={[styles.demoText, { color: colors.gray }]}>
              Demo: user@example.com / password123
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    marginBottom: 24,
  },
  demoText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
});

export default LoginScreen;
