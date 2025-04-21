"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import type { TabScreenProps } from "../../types/navigation";
import WeightProgressGraph from "../../components/WeightProgressGraph";

const ProfileScreen = ({ navigation }: TabScreenProps<"Profile">) => {
  const { colors } = useTheme();

  const [userData, setUserData] = useState({
    name: "Michele",
    username: "@michele",
    age: 30,
    gender: "Feminino",
    weight: 55,
    startingWeight: 60,
    goalWeight: 52,
    height: 160,
    activityLevel: "Moderado",
    goal: "Perder peso",
    dailyCalorieGoal: 1750,
    weeklyWeightLoss: -0.5,
    membershipType: "MEMBRO BÁSICO",
  });

  // State for edit modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [showGoalOptions, setShowGoalOptions] = useState(false);

  // Achievements data
  const achievements = [
    { id: "1", icon: "award", title: "30 Dias", completed: true },
    { id: "2", icon: "target", title: "Meta Atingida", completed: true },
    { id: "3", icon: "star", title: "Semana Perfeita", completed: false },
    { id: "4", icon: "zap", title: "Sequência", completed: false },
  ];

  const goalOptions = [
    { value: "Perder peso", label: "Perder peso" },
    { value: "Manter peso", label: "Manter peso" },
    { value: "Ganhar peso", label: "Ganhar peso" },
  ];

  const handleEditField = (
    field: string,
    value: string | number,
    unit = ""
  ) => {
    setEditField(field);
    setEditValue(String(value));
    setEditUnit(unit);
    setIsEditModalVisible(true);

    if (field === "goal") {
      setShowGoalOptions(true);
    } else {
      setShowGoalOptions(false);
    }
  };

  const saveEdit = () => {
    // Update the user data based on the field being edited
    setUserData((prev) => ({
      ...prev,
      [editField]:
        editField === "weeklyWeightLoss" ||
        editField === "weight" ||
        editField === "height" ||
        editField === "age"
          ? Number.parseFloat(editValue)
          : editValue,
    }));
    setIsEditModalVisible(false);
  };

  const selectGoal = (goal: string) => {
    setEditValue(goal);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as any }],
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#F6F6F6" }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[styles.profileCard, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.profileHeaderContent}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>

              <View style={styles.nameContainer}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.membershipType}>
                  {userData.membershipType}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditField("name", userData.name)}
            >
              <Feather name="edit-2" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Metrics Section */}
        <View style={[styles.metricsContainer, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{userData.weight}</Text>
            <Text style={styles.metricLabel}>PESO</Text>
            <Text style={styles.metricUnit}>kg</Text>
          </View>

          <View style={styles.metricDivider} />

          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{userData.height}</Text>
            <Text style={styles.metricLabel}>ALTURA</Text>
            <Text style={styles.metricUnit}>cm</Text>
          </View>

          <View style={styles.metricDivider} />

          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{userData.age}</Text>
            <Text style={styles.metricLabel}>IDADE</Text>
            <Text style={styles.metricUnit}>anos</Text>
          </View>
        </View>

        {/* Weight Progress Graph */}
        <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
          <Text style={styles.sectionTitle}>PROGRESSO DE PESO</Text>
          <WeightProgressGraph />
        </View>

        {/* Statistics Section */}
        <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
          <Text style={styles.sectionTitle}>ESTATÍSTICAS</Text>

          <View style={styles.statItem}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "#e950a320" },
              ]}
            >
              <Feather name="pie-chart" size={18} color="#e950a3" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Meta Diária de Calorias</Text>
              <Text style={styles.statValue}>
                {userData.dailyCalorieGoal} kcal
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "#e950a320" },
              ]}
            >
              <Feather name="trending-down" size={18} color="#e950a3" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Perda de Peso Semanal</Text>
              <Text style={styles.statValue}>
                {userData.weeklyWeightLoss} kg
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "#e950a320" },
              ]}
            >
              <Feather name="activity" size={18} color="#e950a3" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Nível de Atividade</Text>
              <Text style={styles.statValue}>{userData.activityLevel}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.statItem, { marginBottom: 0 }]}
            onPress={() => handleEditField("goal", userData.goal)}
          >
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: "#e950a320" },
              ]}
            >
              <Feather name="target" size={18} color="#e950a3" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Objetivo</Text>
              <Text style={styles.statValue}>{userData.goal}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        {/* Achievements Section */}
        <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
          <Text style={styles.sectionTitle}>CONQUISTAS</Text>

          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View
                  style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.completed
                        ? "#e950a320"
                        : "#F5F5F5",
                    },
                  ]}
                >
                  <Feather
                    name={achievement.icon as any}
                    size={24}
                    color={achievement.completed ? "#e950a3" : "#9E9E9E"}
                  />
                </View>
                <Text
                  style={[
                    styles.achievementTitle,
                    {
                      color: achievement.completed ? "#333333" : "#9E9E9E",
                    },
                  ]}
                >
                  {achievement.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather
            name="log-out"
            size={20}
            color="#FFFFFF"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Editar{" "}
              {editField === "name"
                ? "Nome"
                : editField === "weight"
                ? "Peso"
                : editField === "height"
                ? "Altura"
                : editField === "age"
                ? "Idade"
                : editField === "goal"
                ? "Objetivo"
                : editField}
            </Text>

            {showGoalOptions ? (
              <View style={styles.goalOptionsContainer}>
                {goalOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.goalOption,
                      editValue === option.value && {
                        backgroundColor: "#e950a320",
                        borderColor: "#e950a3",
                      },
                    ]}
                    onPress={() => selectGoal(option.value)}
                  >
                    <Text
                      style={[
                        styles.goalOptionText,
                        editValue === option.value && {
                          color: "#e950a3",
                          fontWeight: "600",
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                    {editValue === option.value && (
                      <Feather
                        name="check"
                        size={18}
                        color="#e950a3"
                        style={styles.goalOptionCheck}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={editValue}
                  onChangeText={setEditValue}
                  keyboardType={
                    editField === "weight" ||
                    editField === "height" ||
                    editField === "age"
                      ? "numeric"
                      : "default"
                  }
                />
                {editUnit ? (
                  <Text style={styles.inputUnit}>{editUnit}</Text>
                ) : null}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={saveEdit}
              >
                <Text style={styles.modalSaveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  profileHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e950a3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  nameContainer: {
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  membershipType: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9E9E9E",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  editButton: {
    backgroundColor: "#e950a3",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e950a3",
    fontFamily: "Poppins-Bold",
  },
  metricLabel: {
    fontSize: 12,
    color: "#9E9E9E",
    fontFamily: "Poppins-Medium",
    marginTop: 4,
    letterSpacing: 1,
  },
  metricUnit: {
    fontSize: 12,
    color: "#9E9E9E",
    fontFamily: "Poppins-Regular",
  },
  metricDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#F0F0F0",
    alignSelf: "center",
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 1,
    color: "#9E9E9E",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e950a3",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 10,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 20,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    backgroundColor: "#F9F9F9",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  inputUnit: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Poppins-Regular",
    color: "#9E9E9E",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  modalCancelText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  modalSaveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e950a3",
  },
  modalSaveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  goalOptionsContainer: {
    marginBottom: 24,
  },
  goalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginBottom: 12,
  },
  goalOptionText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  goalOptionCheck: {
    marginLeft: 8,
  },
});

export default ProfileScreen;
