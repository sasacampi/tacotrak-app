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
import Button from "../../components/Button";
import type { ScreenProps } from "../../types/navigation";

const ProfileScreen = ({ navigation }: ScreenProps<"Profile">) => {
  const { colors } = useTheme();

  const [userData, setUserData] = useState({
    name: "Michele",
    username: "@michele",
    age: 30,
    gender: "Female",
    weight: 90,
    startingWeight: 109,
    goalWeight: 75,
    height: 170,
    activityLevel: "Moderate",
    goal: "Lose weight",
    dailyCalorieGoal: 1750,
    weeklyWeightLoss: -1.5,
  });

  // State for edit modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editUnit, setEditUnit] = useState("");

  // Achievements data
  const achievements = [
    { id: "1", icon: "award", title: "30 Dias", completed: true },
    { id: "2", icon: "target", title: "Goal Met", completed: true },
    { id: "3", icon: "star", title: "Perfect Week", completed: false },
    { id: "4", icon: "zap", title: "Streak", completed: false },
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
  };

  const saveEdit = () => {
    // Update the user data based on the field being edited
    setUserData((prev) => ({
      ...prev,
      [editField]:
        editField === "weeklyWeightLoss"
          ? Number.parseFloat(editValue)
          : editValue,
    }));
    setIsEditModalVisible(false);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate("TDEECalculator")}>
          <Feather name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.profileInfo}>
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
            <View style={styles.nameContainer}>
              <TouchableOpacity
                onPress={() => handleEditField("name", userData.name)}
              >
                <Text style={[styles.userName, { color: colors.text }]}>
                  {userData.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEditField("username", userData.username)}
              >
                <Text style={[styles.userHandle, { color: colors.gray }]}>
                  {userData.username}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weightStats}>
            <View style={styles.weightStat}>
              <TouchableOpacity
                onPress={() =>
                  handleEditField(
                    "startingWeight",
                    userData.startingWeight,
                    "kg"
                  )
                }
              >
                <Text style={[styles.weightValue, { color: colors.text }]}>
                  {userData.startingWeight} kg
                </Text>
              </TouchableOpacity>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Current
              </Text>
            </View>
            <View style={styles.weightStat}>
              <TouchableOpacity
                onPress={() => handleEditField("weight", userData.weight, "kg")}
              >
                <Text style={[styles.weightValue, { color: colors.text }]}>
                  {userData.weight} kg
                </Text>
              </TouchableOpacity>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Starting
              </Text>
            </View>
            <View style={styles.weightStat}>
              <TouchableOpacity
                onPress={() =>
                  handleEditField("goalWeight", userData.goalWeight, "kg")
                }
              >
                <Text style={[styles.weightValue, { color: colors.text }]}>
                  {userData.goalWeight} kg
                </Text>
              </TouchableOpacity>
              <Text style={[styles.weightLabel, { color: colors.gray }]}>
                Goal
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            STATISTICS
          </Text>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              handleEditField(
                "dailyCalorieGoal",
                userData.dailyCalorieGoal,
                "kcal"
              )
            }
          >
            <View style={styles.statIconContainer}>
              <Feather name="pie-chart" size={18} color={colors.primary} />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Daily Calories Goal
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {userData.dailyCalorieGoal}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              handleEditField(
                "weeklyWeightLoss",
                userData.weeklyWeightLoss,
                "kg"
              )
            }
          >
            <View style={styles.statIconContainer}>
              <Feather name="trending-down" size={18} color={colors.primary} />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Weekly Weight Loss
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {userData.weeklyWeightLoss} kg
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statItem}
            onPress={() =>
              handleEditField("activityLevel", userData.activityLevel)
            }
          >
            <View style={styles.statIconContainer}>
              <Feather name="activity" size={18} color={colors.primary} />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Activity Level
              </Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {userData.activityLevel}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Achievements Section */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ACHIEVEMENTS
          </Text>

          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View
                  style={[
                    styles.achievementIcon,
                    {
                      backgroundColor: achievement.completed
                        ? colors.primary + "20"
                        : colors.lightGray,
                      borderColor: achievement.completed
                        ? colors.primary
                        : colors.gray,
                    },
                  ]}
                >
                  <Feather
                    name={achievement.icon as any}
                    size={24}
                    color={achievement.completed ? colors.primary : colors.gray}
                  />
                </View>
                <Text
                  style={[
                    styles.achievementTitle,
                    {
                      color: achievement.completed ? colors.text : colors.gray,
                    },
                  ]}
                >
                  {achievement.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          icon={<Feather name="log-out" size={18} color={colors.primary} />}
          style={styles.logoutButton}
        />
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Edit{" "}
              {editField.charAt(0).toUpperCase() +
                editField.slice(1).replace(/([A-Z])/g, " $1")}
            </Text>

            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
            >
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={editValue}
                onChangeText={setEditValue}
                keyboardType={
                  editField === "weight" ||
                  editField === "startingWeight" ||
                  editField === "goalWeight" ||
                  editField === "dailyCalorieGoal" ||
                  editField === "weeklyWeightLoss"
                    ? "numeric"
                    : "default"
                }
              />
              {editUnit ? (
                <Text style={[styles.inputUnit, { color: colors.gray }]}>
                  {editUnit}
                </Text>
              ) : null}
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsEditModalVisible(false)}
                variant="outline"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Save"
                onPress={saveEdit}
                style={{ flex: 1, marginLeft: 8 }}
              />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  nameContainer: {
    alignItems: "flex-start",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
  },
  userHandle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  weightStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  weightStat: {
    alignItems: "center",
    flex: 1,
  },
  weightValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
  },
  weightLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 1,
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
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementItem: {
    width: "22%",
    alignItems: "center",
    marginBottom: 16,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
  },
  achievementTitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  logoutButton: {
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  inputUnit: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Poppins-Regular",
  },
  modalButtons: {
    flexDirection: "row",
  },
});

export default ProfileScreen;
