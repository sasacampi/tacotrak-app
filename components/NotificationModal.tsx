import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: "workout" | "water";
  title: string;
  message: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
}) => {
  // Dados de notificação
  const currentNotifications: NotificationItem[] = [
    {
      id: "1",
      type: "workout",
      title: "Treino",
      message: "Está na hora do seu treino, se apresse e prepare-se!",
      time: "1m atrás",
      icon: "activity",
    },
    {
      id: "2",
      type: "water",
      title: "Beber água",
      message: "Já bebeu água hoje? Lembre-se de se manter hidratado.",
      time: "15m atrás",
      icon: "droplet",
    },
  ];

  const previousNotifications: NotificationItem[] = [
    {
      id: "3",
      type: "workout",
      title: "Treino",
      message: "Está na hora do seu treino, se apresse e prepare-se!",
      time: "2h atrás",
      icon: "activity",
    },
    {
      id: "4",
      type: "water",
      title: "Beber água",
      message: "Já bebeu água hoje? Lembre-se de se manter hidratado.",
      time: "1d atrás",
      icon: "droplet",
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notificações</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.notificationsList}
            showsVerticalScrollIndicator={false}
          >
            {/* Notificações atuais */}
            {currentNotifications.length > 0 && (
              <>
                {currentNotifications.map((item) => (
                  <View key={item.id} style={styles.notificationItem}>
                    <View style={styles.notificationIconContainer}>
                      <Feather name={item.icon} size={20} color="#e950a3" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationMessage}>
                        {item.message}
                      </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                      <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            {/* Notificações anteriores */}
            {previousNotifications.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Anteriores</Text>
                {previousNotifications.map((item) => (
                  <View key={item.id} style={styles.notificationItem}>
                    <View style={styles.notificationIconContainer}>
                      <Feather name={item.icon} size={20} color="#e950a3" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationMessage}>
                        {item.message}
                      </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                      <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  notificationsList: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#e950a3",
    marginTop: 20,
    marginBottom: 12,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    paddingRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
    lineHeight: 20,
  },
  notificationTimeContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 2,
    minWidth: 60,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

export default NotificationModal;
