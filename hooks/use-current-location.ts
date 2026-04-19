import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";

export const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent multiple reverse geocode calls
  const isFetchingAddress = useRef(false);

  // Store last coordinates to avoid duplicate geocoding
  const lastCoords = useRef(null);

  const shouldFetchAddress = (coords) => {
    if (!lastCoords.current) return true;

    return (
      Math.abs(coords.latitude - lastCoords.current.latitude) > 0.0001 ||
      Math.abs(coords.longitude - lastCoords.current.longitude) > 0.0001
    );
  };

  const getLocation = useCallback(async () => {
    try {
      if (isFetchingAddress.current) return;

      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Access Denied",
          text2: "Location permission denied",
        });
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        ...options,
      });

      console.log("current loc", currentLocation);

      const coords = currentLocation.coords;
      setLocation(coords);

      // Only reverse geocode if location changed significantly
      if (!shouldFetchAddress(coords)) return;

      lastCoords.current = coords;
      isFetchingAddress.current = true;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      console.log("rev", reverseGeocode);

      if (reverseGeocode.length > 0) {
        setAddress(reverseGeocode[0]);
      }
    } catch (err) {
      console.log("location error", err);
      setError(err?.message || "Failed to get location");
    } finally {
      isFetchingAddress.current = false;
      setLoading(false);
    }
  }, []); // ✅ stable, no re-trigger loop

  // Run only once on mount
  useEffect(() => {
    getLocation();
  }, []);

  return {
    coords: location,
    address,
    loading,
    error,
    refresh: getLocation,
  };
};
