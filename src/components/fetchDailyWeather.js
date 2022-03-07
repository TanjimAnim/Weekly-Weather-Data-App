import dummyDailyData from "./data/dailydata";

export async function fetchDailyWeather(lat, long) {
  const dontCallApi = false;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=alerts&appid=bda70c96bdc44a7616cfcd73cca72a33`;

  if (dontCallApi) {
    return Promise.resolve(dummyDailyData);
  }

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.daily;
    });
}
