"use client";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import type { TabScreenProps } from "../../types/navigation";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
import WeightProgressGraph from "../../components/WeightProgressGraph";
import NotificationModal from "../../components/NotificationModal";

const DashboardScreen = ({ navigation }: TabScreenProps<"Dashboard">) => {
  const { colors } = useTheme();
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [hasNewNotifications] = useState(true); // Estado para controlar se há novas notificações

  const nutritionData = {
    calories: {
      current: 500,
      target: 2000,
      color: "#8676FF",
    },
    carbs: {
      current: 120,
      target: 250,
      color: "#70B01B",
    },
    protein: {
      current: 101,
      target: 120,
      color: "#FFA726",
    },
    fat: {
      current: 35,
      target: 40,
      color: "#C8B6E2",
    },
  };

  const userData = {
    name: "Michele",
    healthScore: 84,
    currentWeight: 58.0,
    weightChange: -0.45,
    percentageChange: 56,
    goalWeight: 52.0,
    heartRate: 97,
    water: 750,
    steps: 9890,
    sleep: "7h 23m",
    lastUpdated: {
      calories: "5m",
      weight: "2d",
      water: "2h",
      steps: "5m",
    },
  };

  const createCircularProgress = (
    size: number,
    strokeWidth: number,
    progress: number,
    color: string,
    bgColor = "rgba(255, 255, 255, 0.3)",
    useGradient = false
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {useGradient && (
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity="1" />
              <Stop offset="100%" stopColor={`${color}80`} stopOpacity="1" />
            </LinearGradient>
          </Defs>
        )}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={useGradient ? "url(#grad)" : color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
    );
  };

  const showNotifications = () => {
    setNotificationModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#F6F6F6" }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={styles.helloText}>Olá,</Text>
            <Text style={styles.usernameText}>{userData.name}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={showNotifications}
            >
              <Feather name="bell" size={22} color="#333" />
              {hasNewNotifications && <View style={styles.notificationDot} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="user" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.activityCard, { backgroundColor: "#e950a3" }]}>
          <View style={styles.activityHeader}>
            <View style={styles.activityTitleContainer}>
              <Feather
                name="activity"
                size={20}
                color="#FFFFFF"
                style={styles.activityIcon}
              />
              <Text style={styles.activityTitle}>Atividade</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Ver tudo</Text>
              <Feather name="chevron-right" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.caloriesContainer}>
            <View>
              <Text style={styles.caloriesLabel}>Calorias</Text>
              <Text style={styles.caloriesValue}>2350</Text>
            </View>
            <View style={styles.progressCircleContainer}>
              {createCircularProgress(
                50,
                6,
                0.59,
                "#FFFFFF",
                "rgba(255, 255, 255, 0.3)"
              )}
            </View>
          </View>

          <View style={styles.macroDetailsCard}>
            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>120g</Text>
                <Text style={styles.macroLabel}>Proteína</Text>
                <View
                  style={[
                    styles.macroIndicator,
                    { backgroundColor: "#3B82F6" },
                  ]}
                />
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>50g</Text>
                <Text style={styles.macroLabel}>Carboidratos</Text>
                <View
                  style={[
                    styles.macroIndicator,
                    { backgroundColor: "#EF4444" },
                  ]}
                />
              </View>

              <View style={styles.macroItem}>
                <Text style={styles.macroValue}>8g</Text>
                <Text style={styles.macroLabel}>Gorduras</Text>
                <View
                  style={[
                    styles.macroIndicator,
                    { backgroundColor: "#F59E0B" },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.metricsHeader}>
          <Text style={styles.metricsTitle}>Métricas</Text>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: "#e950a3" }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>CALORIAS</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>
                  {nutritionData.calories.current}
                </Text>
                <Text style={styles.metricUnit}>cal</Text>
              </View>
              <Text style={styles.metricUpdate}>
                última atualização {userData.lastUpdated.calories}
              </Text>
            </View>
            <View style={styles.metricGraphContainer}>
              {createCircularProgress(
                60,
                8,
                nutritionData.calories.current / nutritionData.calories.target,
                "#FFFFFF",
                "rgba(255, 255, 255, 0.3)"
              )}
            </View>
          </View>

          <View style={[styles.metricCard, { backgroundColor: "#FF8A65" }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>PESO</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>{userData.currentWeight}</Text>
                <Text style={styles.metricUnit}>kg</Text>
              </View>
              <Text style={styles.metricUpdate}>
                última atualização {userData.lastUpdated.weight}
              </Text>
            </View>
            <View style={styles.metricGraphContainer}>
              <Svg height="40" width="60" viewBox="0 0 60 40">
                <Path
                  d="M0,20 C10,10 20,30 30,15 C40,5 50,25 60,20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
              </Svg>
            </View>
          </View>

          {/* Water Card */}
          <View style={[styles.metricCard, { backgroundColor: "#FF5252" }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>ÁGUA</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>{userData.water}</Text>
                <Text style={styles.metricUnit}>ml</Text>
              </View>
              <Text style={styles.metricUpdate}>
                última atualização {userData.lastUpdated.water}
              </Text>
            </View>
            <View style={styles.metricGraphContainer}>
              <Feather name="droplet" size={30} color="#FFFFFF" />
            </View>
          </View>

          <View style={[styles.metricCard, { backgroundColor: "#3A3E4F" }]}>
            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>PASSOS</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>
                  {userData.steps.toLocaleString()}
                </Text>
              </View>
              <Text style={styles.metricUpdate}>
                última atualização {userData.lastUpdated.steps}
              </Text>
            </View>
            <View style={styles.metricGraphContainer}>
              <Feather name="activity" size={30} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Progresso de Peso</Text>
          <WeightProgressGraph />
        </View>
      </ScrollView>
      <NotificationModal
        visible={notificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greetingContainer: {
    flexDirection: "column",
  },
  helloText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    fontFamily: "Poppins-Medium",
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF0000",
  },
  activityCard: {
    backgroundColor: "#e950a3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  activityTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityIcon: {
    marginRight: 8,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 4,
    fontFamily: "Poppins-Regular",
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  caloriesLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    fontFamily: "Poppins-Regular",
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
  },
  progressCircleContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e950a3",
    fontFamily: "Poppins-Bold",
  },
  macroDetailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    fontFamily: "Poppins-Bold",
  },
  macroLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  macroIndicator: {
    height: 3,
    width: "50%",
    borderRadius: 2,
    marginTop: 6,
  },
  metricsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metricCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    fontFamily: "Poppins-SemiBold",
  },
  metricValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  metricUnit: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
  metricUpdate: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
    fontFamily: "Poppins-Regular",
  },
  metricGraphContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    fontFamily: "Poppins-Bold",
  },
  viewMoreText: {
    fontSize: 12,
    color: "#FF8A65",
    fontFamily: "Poppins-Medium",
  },
});

export default DashboardScreen;
