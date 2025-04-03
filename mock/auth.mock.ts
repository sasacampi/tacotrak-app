import AsyncStorage from "@react-native-async-storage/async-storage";

export const mockLogin = async (email: string, password: string) => {
  return new Promise<{ token: string }>(async (resolve, reject) => {
    setTimeout(async () => {
      if (email === "user@expo.com" && password === "123456") {
        const token = "expo-mock-token-123";
        await AsyncStorage.setItem("@auth_token", token);
        resolve({ token });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1500);
  });
};
