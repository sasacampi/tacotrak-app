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

const RegisterScreen = ({ navigation }: ScreenProps) => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would create a user account
      navigation.navigate("Onboarding");
    }, 1500);
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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              Criar Conta
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.formContainer}>
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
                Nome
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Feather
                  name="user"
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Seu nome"
                  placeholderTextColor={colors.gray}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

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

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Confirmar Senha
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
                  placeholder="Confirme sua senha"
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Feather
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Button
              title="Criar Conta"
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />

            <View style={styles.loginPrompt}>
              <Text style={[styles.loginPromptText, { color: colors.text }]}>
                Já tem uma conta?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.loginLink, { color: colors.primary }]}>
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
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
  registerButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginPromptText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default RegisterScreen;
