import * as SecureStore from "expo-secure-store";

const ONBOARDED_KEY = "onboarded_status";

export const saveOnboardedStatus = async (value) => {
  try {
    await SecureStore.setItemAsync(ONBOARDED_KEY, value);
    console.log("✅ Onboarded status updated");
  } catch (e) {
    console.error("Error saving onboarded status", e);
  }
};

export const getOnboardedStatus = async () => {
  try {
    return await SecureStore.getItemAsync(ONBOARDED_KEY);
  } catch (e) {
    console.error("Error getting onboarded status", e);
    return null;
  }
};
