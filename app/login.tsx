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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "./context/ThemeContext";
import type { ScreenProps } from "../types/navigation";

const LoginScreen = ({ navigation }: ScreenProps<"Login">) => {
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
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs", params: { screen: "Dashboard" } }],
        });
      } else {
        setIsLoading(false);
        setError("A senha que você digitou está incorreta");
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
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.appName}>TACOTRAK</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Entre na sua conta</Text>
            <View style={styles.mockCredentialsContainer}>
              <Text style={styles.mockCredentialsText}>
                Credenciais de demonstração: {mockCredentials.email} /{" "}
                {mockCredentials.password}
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Seu email"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Senha</Text>
              <View
                style={[
                  styles.inputContainer,
                  error ? styles.inputError : null,
                ]}
              >
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Sua senha"
                  placeholderTextColor="#9E9E9E"
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
                    color="#9E9E9E"
                  />
                </TouchableOpacity>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: "#3A3E4F" }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>ou</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <Text style={{ fontWeight: "bold", color: "#4285F4" }}>
                    G
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <Feather name="facebook" size={20} color="#1877F2" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.socialIconContainer}>
                  <Feather name="twitter" size={20} color="#1DA1F2" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Ainda não tem uma conta? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={[styles.registerLink, { color: "#fc6a2d" }]}>
                  Cadastre-se
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
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A3E4F",
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
    marginTop: 8,
  },
  formContainer: {
    width: "100%",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    fontFamily: "Poppins-Bold",
    color: "#000000",
  },
  mockCredentialsContainer: {
    marginBottom: 24,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3A3E4F",
  },
  mockCredentialsText: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "Poppins-Regular",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#F44336",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#000000",
    fontFamily: "Montserrat-Regular",
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fc6a2d",
    fontFamily: "Poppins-Medium",
  },
  loginButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 16,
    color: "#9E9E9E",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  socialButton: {
    marginHorizontal: 12,
  },
  socialIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#757575",
    fontFamily: "Poppins-Regular",
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});

export default LoginScreen;
