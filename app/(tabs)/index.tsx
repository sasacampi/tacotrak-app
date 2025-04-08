"use client";
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
import ProgressRing from "../../components/ProgressRing";
import MacroBar from "../../components/MacroBar";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

type Macro = {
  current: number;
  target: number;
  color: string;
};

export default function DashboardScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  // Mock data
  const dailyGoal = 2200;
  const consumed = 1450;
  const remaining = dailyGoal - consumed;
  const progress = consumed / dailyGoal;

  const macros = {
    protein: { current: 85, target: 150, color: "#FF6B6B" },
    carbs: { current: 120, target: 220, color: "#4ECDC4" },
    fat: { current: 45, target: 70, color: "#FFD166" },
  };

  const handleAddMeal = () => {
    router.push("/add-food");
  };

  const handleViewDiary = () => {
    router.push("/meal-diary");
  };

  const handleViewProfile = () => {
    router.push("/profile");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
        <TouchableOpacity onPress={handleViewProfile}>
          <View
            style={[styles.profileButton, { backgroundColor: colors.card }]}
          >
            <Feather name="user" size={20} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.calorieCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Calorias Diárias
          </Text>

          <View style={styles.ringContainer}>
            <ProgressRing
              progress={progress}
              size={180}
              strokeWidth={15}
              text={`${consumed}`}
              subText="kcal consumidas"
              color={colors.primary}
            />
          </View>

          <View style={styles.calorieInfo}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray }]}>
                Meta
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {dailyGoal} kcal
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray }]}>
                Restante
              </Text>
              <Text style={[styles.infoValue, { color: colors.primary }]}>
                {remaining} kcal
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.macrosCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Macronutrientes
          </Text>

          <MacroBar
            label="Proteínas"
            current={macros.protein.current}
            target={macros.protein.target}
            color={macros.protein.color}
          />

          <MacroBar
            label="Carboidratos"
            current={macros.carbs.current}
            target={macros.carbs.target}
            color={macros.carbs.color}
          />

          <MacroBar
            label="Gorduras"
            current={macros.fat.current}
            target={macros.fat.target}
            color={macros.fat.color}
          />
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Adicionar Refeição"
            onPress={handleAddMeal}
            icon={<Feather name="plus" size={18} color="#FFF" />}
            style={{ marginBottom: 12 }}
          />

          <Button
            title="Ver Diário de Refeições"
            onPress={handleViewDiary}
            variant="outline"
            icon={<Feather name="book" size={18} color={colors.primary} />}
          />
        </View>

        <View
          style={[
            styles.tipsCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.tipsHeader}>
            <Feather name="info" size={20} color={colors.primary} />
            <Text style={[styles.tipsTitle, { color: colors.text }]}>
              Dica do Dia
            </Text>
          </View>

          <Text style={[styles.tipsContent, { color: colors.text }]}>
            Consumir proteínas em todas as refeições ajuda a manter a saciedade
            e preservar a massa muscular durante a perda de peso.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  calorieCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  ringContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  calorieInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  macrosCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  tipsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  tipsContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});
