// import AsyncStorage from "@react-native-async-storage/async-storage";
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

export const storeUserData = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (e) {
    console.log("Error saving data", e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error reading data", e);
  }
};
