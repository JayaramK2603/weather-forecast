import axios from "axios";

async function getWeatherDetails(lt: { lat: number; long: number }, setLoader:any) {
  setLoader(true);
  let res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lt.lat}&longitude=${lt.long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  setTimeout(() => {
    setLoader(false);
  }, 500);
  return res.data;
}

export const WeatherService = {
  getWeatherDetails,
};