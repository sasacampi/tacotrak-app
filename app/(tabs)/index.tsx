"use client";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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

  const recipeIdeas = [
    {
      image:
        "https://media.istockphoto.com/id/1194626748/pt/foto/roast-chicken-legs-with-fried-potatoes-and-vegetables.jpg?s=612x612&w=0&k=20&c=wKcze6D28rCVRgN4GVAKThfZ6himZxLqBxktDgsVbXQ=",
      kitchen: "Cozinha Saudável",
      title: "Frango assado ao molho",
      rating: 4.9,
      time: "20-25 min",
      words: "980 palavras",
    },
    {
      image:
        "https://media.istockphoto.com/id/1180275119/pt/foto/homemade-mexican-baja-rice-bowl.jpg?s=612x612&w=0&k=20&c=d9XnW9kU5ZXYMaGQ9Rwalgx_5cRagU3Y7wi0hijw2Og=",
      kitchen: "Cozinha Fit",
      title: "Salada de quinoa com legumes",
      rating: 4.7,
      time: "15 min",
      words: "750 palavras",
    },
    {
      image:
        "https://masterkitchen.com.br/wp-content/uploads/2022/02/Omelete-de-forno-com-espinafre-e-queijo-otimo-para-servir-como-brunch.jpg",
      kitchen: "Cozinha Rápida",
      title: "Omelete de espinafre e queijo",
      rating: 4.8,
      time: "10 min",
      words: "620 palavras",
    },
  ];

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
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="user" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.activityCard, { backgroundColor: "#fc6a2d" }]}>
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
              <Text style={styles.caloriesValue}>2350 Cal</Text>
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
          <View style={[styles.metricCard, { backgroundColor: "#fc6a2d" }]}>
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

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Ideias de Receitas</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>Ver mais &gt;</Text>
            </TouchableOpacity>
          </View>

          {recipeIdeas.map((recipe, index) => (
            <View key={index} style={styles.recipeCard}>
              <View style={styles.recipeImageContainer}>
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.recipeImage}
                />
              </View>
              <View style={styles.recipeContent}>
                <Text style={styles.recipeKitchen}>{recipe.kitchen}</Text>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.recipeDetails}>
                  <View style={styles.recipeRating}>
                    <Feather name="star" size={14} color="#FF8A65" />
                    <Text style={styles.recipeRatingText}>{recipe.rating}</Text>
                  </View>
                  <View style={styles.recipeDot} />
                  <Text style={styles.recipeTime}>{recipe.time}</Text>
                  <View style={styles.recipeDot} />
                  <Text style={styles.recipeWords}>{recipe.words}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.recipeAddButton}>
                <Feather name="plus" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
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
  },
  activityCard: {
    backgroundColor: "#fc6a2d",
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
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  recipeImageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recipeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  recipeOverlayText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  recipeContent: {
    padding: 16,
  },
  recipeKitchen: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  recipeDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeRatingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    fontFamily: "Poppins-Medium",
  },
  recipeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CCC",
    marginHorizontal: 8,
  },
  recipeTime: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  recipeWords: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  recipeAddButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF8A65",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  reminderIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  reminderTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    fontFamily: "Poppins-Bold",
  },
  reminderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  reminderProgress: {
    width: "100%",
    marginBottom: 20,
  },
  reminderProgressBar: {
    height: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    marginBottom: 8,
    overflow: "hidden",
  },
  reminderProgressFill: {
    height: "100%",
    backgroundColor: "#FF5252",
    borderRadius: 5,
  },
  reminderProgressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  reminderButton: {
    backgroundColor: "#FF5252",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  reminderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});

export default DashboardScreen;
