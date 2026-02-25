import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    try {
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
        accuracy: Location.Accuracy.Highest,
        ...options,
      });

      setLocation(currentLocation.coords);

      // Reverse geocode
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log("rev geo", reverseGeocode)

      if (reverseGeocode.length > 0) {
        setAddress(reverseGeocode[0]);
      }
    } catch (err: any) {
      console.log("location error", err);
      // Toast.show({
      //   type: "error",
      //   text1: "Location Error",
      //   text2: err?.message || "Failed to get location",
      // });
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    if (address) return;

    getLocation();
  }, [getLocation]);

  return {
    coords: location,
    address,
    loading,
    error,
    refresh: getLocation,
  };
};
