import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log("✅ Token saved securely");
  } catch (e) {
    console.error("Error saving token", e);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (e) {
    console.error("Error getting token", e);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log("🗑️ Token deleted");
  } catch (e) {
    console.error("Error deleting token", e);
  }
};

export const getUser = async () => {
  try {
    const data = await SecureStore.getItemAsync(USER_KEY);
    return JSON.parse(data);
  } catch (e) {
    console.error("Error getting token", e);
    return null;
  }
};
