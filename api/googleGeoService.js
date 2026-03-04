export const getDirections = async (origin, destination) => {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`;

  const response = await fetch(url);
  const json = await response.json();

  console.log("json", json?.routes[0].overview_polyline.points);

  if (json?.routes?.length) {
    return json?.routes[0].overview_polyline.points;
  }

  return null;
};
