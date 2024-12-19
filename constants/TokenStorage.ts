// tokenStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "app_token";

class TokenStorage {
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      console.log("Token lấy được: ", token);
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  }
}

// Xuất instance singleton
export default new TokenStorage();
