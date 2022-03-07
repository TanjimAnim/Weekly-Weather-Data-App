export const fetchCity = async (lat, long) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    console.error(data.error);
    return "Error";
  } else {
    return data.address;
  }
};
