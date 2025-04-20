"use client";

import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import Svg, { Path, Circle, Line, Text as SvgText } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../app/context/ThemeContext";

interface WeightEntry {
  date: string;
  weight: number;
}

interface WeightProgressGraphProps {
  data?: WeightEntry[];
}

const WeightProgressGraph: React.FC<WeightProgressGraphProps> = ({
  data: propData,
}) => {
  const { colors } = useTheme();
  const { width } = Dimensions.get("window");
  const graphWidth = width - 80;
  const graphHeight = 200;
  const [selectedPeriod, setSelectedPeriod] = useState<
    "Semanal" | "Mensal" | "Anual"
  >("Semanal");
  const [modalVisible, setModalVisible] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [selectedPoint, setSelectedPoint] = useState<WeightEntry | null>(null);

  const weeklyData: WeightEntry[] = [
    { date: "20/04", weight: 52.5 },
    { date: "21/04", weight: 52.3 },
    { date: "22/04", weight: 52.7 },
    { date: "23/04", weight: 51.8 },
    { date: "24/04", weight: 51.2 },
  ];

  const monthlyData: WeightEntry[] = [
    { date: "Jan", weight: 54.0 },
    { date: "Fev", weight: 53.5 },
    { date: "Mar", weight: 52.8 },
    { date: "Abr", weight: 51.2 },
  ];

  const yearlyData: WeightEntry[] = [
    { date: "2020", weight: 58.0 },
    { date: "2021", weight: 56.5 },
    { date: "2022", weight: 54.0 },
    { date: "2023", weight: 52.0 },
    { date: "2024", weight: 51.2 },
  ];

  const getDataForPeriod = () => {
    switch (selectedPeriod) {
      case "Mensal":
        return monthlyData;
      case "Anual":
        return yearlyData;
      case "Semanal":
      default:
        return weeklyData;
    }
  };

  const [data, setData] = useState<WeightEntry[]>(propData || weeklyData);

  React.useEffect(() => {
    setData(getDataForPeriod());
  }, [selectedPeriod]);

  const weights = data.map((item) => item.weight);
  const minWeight = Math.min(...weights) - 0.5;
  const maxWeight = Math.max(...weights) + 0.5;

  const getX = (index: number) => {
    return 40 + (index / (data.length - 1)) * (graphWidth - 40);
  };

  const getY = (weight: number) => {
    const range = maxWeight - minWeight;
    const normalizedWeight = range === 0 ? 0 : (weight - minWeight) / range;
    return 40 + (1 - normalizedWeight) * (graphHeight - 80);
  };

  let path = `M${getX(0)} ${getY(data[0].weight)}`;
  for (let i = 1; i < data.length; i++) {
    const x1 = getX(i - 1);
    const y1 = getY(data[i - 1].weight);
    const x2 = getX(i);
    const y2 = getY(data[i].weight);

    // Create a smooth curve
    const xMid = (x1 + x2) / 2;
    path += ` C${xMid} ${y1}, ${xMid} ${y2}, ${x2} ${y2}`;
  }

  const handleAddWeight = () => {
    if (newWeight && Number.parseFloat(newWeight) > 0) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      const newEntry: WeightEntry = {
        date: formattedDate,
        weight: Number.parseFloat(newWeight),
      };

      setData([...data, newEntry]);
      setNewWeight("");
      setModalVisible(false);
    }
  };

  const handlePointPress = (item: WeightEntry) => {
    setSelectedPoint(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Meu progresso
        </Text>
        <View style={styles.periodSelectorContainer}>
          {(["Semanal", "Mensal", "Anual"] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodOption,
                selectedPeriod === period && { backgroundColor: "#e950a3" },
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period && { color: "#FFFFFF" },
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedPoint && (
        <View
          style={[styles.selectedPointCard, { backgroundColor: "#e950a3" }]}
        >
          <Text style={styles.selectedPointDate}>{selectedPoint.date}</Text>
          <Text style={styles.selectedPointWeight}>
            {selectedPoint.weight} kg
          </Text>
        </View>
      )}

      <View style={styles.graphContainer}>
        <Svg width={width - 40} height={graphHeight}>
          {[minWeight, (minWeight + maxWeight) / 2, maxWeight].map(
            (weight, index) => (
              <SvgText
                key={`y-label-${index}`}
                x="10"
                y={getY(weight) + 5}
                fontSize="10"
                fill="#666"
                textAnchor="start"
              >
                {weight.toFixed(1)}
              </SvgText>
            )
          )}

          {data.map((item, index) => (
            <SvgText
              key={`x-label-${index}`}
              x={getX(index)}
              y={graphHeight - 10}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {item.date}
            </SvgText>
          ))}

          {[minWeight, (minWeight + maxWeight) / 2, maxWeight].map(
            (weight, index) => (
              <Line
                key={`grid-${index}`}
                x1="40"
                y1={getY(weight)}
                x2={graphWidth}
                y2={getY(weight)}
                stroke="#EEEEEE"
                strokeWidth="1"
              />
            )
          )}

          <Line
            x1={getX(data.length - 1)}
            y1="40"
            x2={getX(data.length - 1)}
            y2={graphHeight - 40}
            stroke="#DDDDDD"
            strokeWidth="1"
            strokeDasharray="5,5"
          />

          <Path d={path} fill="none" stroke="#e950a3" strokeWidth="3" />

          {data.map((item, index) => (
            <Circle
              key={index}
              cx={getX(index)}
              cy={getY(item.weight)}
              r="6"
              fill={selectedPoint === item ? "#e950a3" : "white"}
              stroke="#FF8A65"
              strokeWidth="2"
              onPress={() => handlePointPress(item)}
            />
          ))}
        </Svg>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#e950a3" }]}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="plus" size={16} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Adicionar peso</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: "#FFFFFF" }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Adicionar novo peso
            </Text>

            <TextInput
              style={[styles.weightInput, { borderColor: colors.border }]}
              placeholder="Peso em kg"
              keyboardType="numeric"
              value={newWeight}
              onChangeText={setNewWeight}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.saveButton,
                  { backgroundColor: "#e950a3" },
                ]}
                onPress={handleAddWeight}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "column",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
  },
  periodSelectorContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 4,
  },
  periodOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 25,
  },
  periodText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#666",
  },
  selectedPointCard: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    flexDirection: "row",
    marginBottom: 16,
  },
  selectedPointDate: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 8,
    fontFamily: "Poppins-SemiBold",
  },
  selectedPointWeight: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
  },
  graphContainer: {
    marginVertical: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
    fontFamily: "Poppins-SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "Poppins-SemiBold",
  },
  weightInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
    fontFamily: "Poppins-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  cancelButtonText: {
    color: "#666666",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  saveButton: {
    backgroundColor: "#e950a3",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});

export default WeightProgressGraph;
