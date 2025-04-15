"use client";

import type React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

interface DateSelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const { colors } = useTheme();

  const generateWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const weekDates = generateWeekDates();

  const isSelectedDate = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getDayName = (date: Date) => {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <View style={styles.datesContainer}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dateItem}
            onPress={() => onSelectDate(date)}
          >
            <Text
              style={[
                styles.dayName,
                { color: isSelectedDate(date) ? colors.primary : colors.gray },
              ]}
            >
              {getDayName(date)}
            </Text>
            <View
              style={[
                styles.dateCircle,
                isSelectedDate(date) && { backgroundColor: "#007AFF" },
              ]}
            >
              <Text
                style={[
                  styles.dateNumber,
                  { color: isSelectedDate(date) ? "#FFFFFF" : colors.text },
                ]}
              >
                {date.getDate().toString().padStart(2, "0")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateItem: {
    alignItems: "center",
  },
  dayName: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "Poppins-Regular",
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  dateNumber: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
});

export default DateSelector;
