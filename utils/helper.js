export function Capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFullAddress(location) {
  return `${location.address}, ${location.city}, ${location.state_data.name} ${location.postal_code}, ${location.country_data.name}`;
}
