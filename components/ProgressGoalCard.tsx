"use client";

import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

interface ProgressGoalCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  subtitle: string;
  timeframe?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const ProgressGoalCard: React.FC<ProgressGoalCardProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  timeframe,
  onPress,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: "#FFFFFF",
        borderColor: "transparent",
        ...(style || {}),
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: iconBgColor + "20" },
            ]}
          >
            {icon}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.gray }]}>
              {subtitle}
            </Text>
          </View>
        </View>

        {timeframe && (
          <View style={styles.rightContent}>
            <Text style={[styles.timeframe, { color: colors.gray }]}>
              {timeframe}
            </Text>
            <Feather name="chevron-right" size={16} color={colors.gray} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeframe: {
    fontSize: 12,
    marginRight: 4,
    fontFamily: "Poppins-Regular",
  },
});

export default ProgressGoalCard;
