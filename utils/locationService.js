import * as Location from "expo-location";
import { LOCATION_TASK } from "./locationTask";

export const startTracking = async () => {
  try {
    // Foreground permission
    const { status: fgStatus } =
      await Location.requestForegroundPermissionsAsync();

    if (fgStatus !== "granted") {
      console.log("❌ Foreground permission denied");
      return;
    }

    // Background permission
    const { status: bgStatus } =
      await Location.requestBackgroundPermissionsAsync();

    if (bgStatus !== "granted") {
      console.log("❌ Background permission denied");
      return;
    }

    const isStarted =
      await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);

    if (isStarted) {
      console.log("⚠️ Tracking already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 60000, // 1 min
      distanceInterval: 20, // 20 meters
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: "Tracking location",
        notificationBody: "Your location is being used for deliveries",
      },
    });

    console.log("✅ Tracking started");
  } catch (err) {
    console.log("❌ Start tracking error:", err);
  }
};

export const stopTracking = async () => {
  try {
    const started =
      await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);

    if (!started) {
      console.log("⚠️ Tracking already stopped");
      return;
    }

    await Location.stopLocationUpdatesAsync(LOCATION_TASK);

    console.log("🛑 Tracking stopped");
  } catch (err) {
    console.log("❌ Stop tracking error:", err);
  }
};
