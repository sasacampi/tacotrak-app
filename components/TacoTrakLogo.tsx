import type React from "react";
import { View, Image, StyleSheet } from "react-native";

interface TacoTrakLogoProps {
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

export const TacoTrakLogo: React.FC<TacoTrakLogoProps> = ({
  size = 50,
  backgroundColor = "#e950a3",
  iconColor = "#FFFFFF",
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size * 0.24,
          backgroundColor,
        },
      ]}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={[
          styles.logo,
          {
            width: size * 0.6,
            height: size * 0.6,
            tintColor: iconColor,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    tintColor: "#FFFFFF",
  },
});
