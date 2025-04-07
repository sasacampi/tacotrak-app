import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContent";
import Button from "../../components/Button";
import { ScreenProps } from "../../types/navigation";

const ProfileScreen = ({ navigation }: ScreenProps) => {
  const { colors } = useTheme();

  // Mock user data
  const [userData, setUserData] = useState({
    name: "João Silva",
    age: 30,
    gender: "Masculino",
    weight: 70,
    height: 170,
    activityLevel: "Moderadamente ativo",
    goal: "Manutenção",
    weightHistory: [
      { date: "01/03", weight: 72 },
      { date: "08/03", weight: 71.5 },
      { date: "15/03", weight: 71 },
      { date: "22/03", weight: 70.5 },
      { date: "29/03", weight: 70 },
    ],
  });

  const handleEditProfile = () => {
    navigation.navigate("Onboarding");
  };

  const handleCalculateTDEE = () => {
    navigation.navigate("TDEECalculator");
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          }),
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Perfil</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Feather name="edit" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.avatarText}>
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {userData.name}
          </Text>
        </View>

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Informações Pessoais
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>
              Idade
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.age} anos
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>
              Gênero
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.gender}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>Peso</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.weight} kg
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>
              Altura
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.height} cm
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>
              Nível de Atividade
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.activityLevel}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.gray }]}>
              Objetivo
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {userData.goal}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.progressCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Progresso de Peso
          </Text>

          <View style={styles.chartContainer}>
            {/* Simple chart representation */}
            <View style={styles.chart}>
              {userData.weightHistory.map((entry, index) => {
                const heightPercentage = ((entry.weight - 69) / 4) * 100; // Scale between 69-73kg
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View
                      style={[
                        styles.chartBar,
                        {
                          height: `${heightPercentage}%`,
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                    <Text style={[styles.chartLabel, { color: colors.gray }]}>
                      {entry.date}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.chartYAxis}>
              <Text style={[styles.chartYLabel, { color: colors.gray }]}>
                73kg
              </Text>
              <Text style={[styles.chartYLabel, { color: colors.gray }]}>
                71kg
              </Text>
              <Text style={[styles.chartYLabel, { color: colors.gray }]}>
                69kg
              </Text>
            </View>
          </View>

          <View style={styles.weightChange}>
            <Text style={[styles.weightChangeLabel, { color: colors.gray }]}>
              Mudança Total
            </Text>
            <Text style={[styles.weightChangeValue, { color: colors.success }]}>
              -2.0 kg
            </Text>
          </View>
        </View>

        <Button
          title="Recalcular TDEE"
          onPress={handleCalculateTDEE}
          icon={<Feather name="refresh-cw" size={18} color="#FFF" />}
          style={styles.tdeeButton}
        />

        <Button
          title="Sair"
          onPress={handleLogout}
          variant="outline"
          icon={<Feather name="log-out" size={18} color={colors.primary} />}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
    marginVertical: 16,
  },
  chart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  chartBar: {
    width: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    marginTop: 8,
    fontSize: 12,
  },
  chartYAxis: {
    width: 40,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  chartYLabel: {
    fontSize: 12,
  },
  weightChange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  weightChangeLabel: {
    fontSize: 16,
  },
  weightChangeValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  tdeeButton: {
    marginTop: 10,
    marginBottom: 16,
  },
  logoutButton: {
    marginBottom: 20,
  },
});

export default ProfileScreen;
