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
      title: "Work out",
      message: "It's your Work out time, hurry up! and get ready.",
      time: "1m ago",
      icon: "activity",
    },
    {
      id: "2",
      type: "water",
      title: "Beber água",
      message: "Já bebeu água hoje? Lembre-se de se manter hidratado.",
      time: "15m ago",
      icon: "droplet",
    },
  ];

  const previousNotifications: NotificationItem[] = [
    {
      id: "3",
      type: "workout",
      title: "Work out",
      message: "It's your Work out time, hurry up! and get ready.",
      time: "2h ago",
      icon: "activity",
    },
    {
      id: "4",
      type: "water",
      title: "Beber água",
      message: "Já bebeu água hoje? Lembre-se de se manter hidratado.",
      time: "1d ago",
      icon: "droplet",
    },
  ];

  // Vamos atualizar o estilo do modal para usar a cor rosa (#e950a3)

  // Atualizar o estilo do cabeçalho do modal
  const modalHeader = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#fc6a2d", // Adicionando cor rosa ao cabeçalho
  };

  // Atualizar o estilo do título do modal para texto branco
  const modalTitle = {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF", // Mudando para branco para contrastar com o fundo rosa
  };

  // Atualizar o botão de fechar para branco
  const closeButton = {
    padding: 4,
    color: "#FFFFFF", // Mudando para branco
  };

  // Atualizar o renderNotificationItem para usar a cor rosa nos ícones
  const renderNotificationItem = (item: NotificationItem) => (
    <View key={item.id} style={styles.notificationItem}>
      <View
        style={[
          styles.notificationIconContainer,
          { backgroundColor: "#fc6a2d20" },
        ]}
      >
        <Feather name={item.icon} size={20} color="#fc6a2d" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      <View style={styles.notificationTimeContainer}>
        <Text
          style={[
            styles.notificationTime,
            { backgroundColor: "#fc6a2d20", color: "#fc6a2d" },
          ]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  // Atualizar o estilo do título da seção "Previous" para usar a cor rosa
  const sectionTitle = {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#fc6a2d", // Mudando para rosa
    marginTop: 20,
    marginBottom: 12,
  };

  // Atualizar o return do componente para usar os novos estilos
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalHeader, { backgroundColor: "#fc6a2d" }]}>
            <Text style={[styles.modalTitle, { color: "#FFFFFF" }]}>
              Notification
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#FFFFFF" />
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
                    <View
                      style={[
                        styles.notificationIconContainer,
                        { backgroundColor: "#fc6a2d20" },
                      ]}
                    >
                      <Feather name={item.icon} size={20} color="#fc6a2d" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationMessage}>
                        {item.message}
                      </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                      <Text
                        style={[
                          styles.notificationTime,
                          { backgroundColor: "#fc6a2d20", color: "#fc6a2d" },
                        ]}
                      >
                        {item.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            {/* Notificações anteriores */}
            {previousNotifications.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: "#fc6a2d" }]}>
                  Previous
                </Text>
                {previousNotifications.map((item) => (
                  <View key={item.id} style={styles.notificationItem}>
                    <View
                      style={[
                        styles.notificationIconContainer,
                        { backgroundColor: "#fc6a2d20" },
                      ]}
                    >
                      <Feather name={item.icon} size={20} color="#fc6a2d" />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationMessage}>
                        {item.message}
                      </Text>
                    </View>
                    <View style={styles.notificationTimeContainer}>
                      <Text
                        style={[
                          styles.notificationTime,
                          { backgroundColor: "#fc6a2d20", color: "#fc6a2d" },
                        ]}
                      >
                        {item.time}
                      </Text>
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
    color: "#333",
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
