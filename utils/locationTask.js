import * as TaskManager from "expo-task-manager";

export const LOCATION_TASK = "rider-location-task";

import { appService } from "@/api/appService";

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.log("❌ Task error:", error);
    return;
  }

  if (!data) return;

  const { locations } = data;

  if (!locations || locations.length === 0) return;

  const { latitude, longitude } = locations[0].coords;

  try {
    console.log("📍 Sending location:", latitude, longitude);

    await appService.setCurrentCordinates({ latitude, longitude });
  } catch (err) {
    console.log("❌ API error:", err);
  }
});
