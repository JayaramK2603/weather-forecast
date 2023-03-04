import { useEffect, useState } from "react";
import { DetailedSection } from "./components/detailedSection";
import { StatusSection } from "./components/status";
import {
  deStructureWeatherDetails,
} from "./configs/weatherConfigs";
import { TN_Coor_DataSet } from "./constants/TN_Coor";
import { WeatherService } from "./service/weatherService";

export const App = () => {
  const [loader, setLoader] = useState(true);
  const [selectedCity, setCity] = useState(TN_Coor_DataSet[0]);
  const [tempData, setTempData] = useState<any>({});

  async function getWeatherApiCall(latLong: any) {
    let data = await WeatherService.getWeatherDetails(latLong, setLoader);
    setTempData(data.hourly.time.length ? deStructureWeatherDetails(data) : {});
  }

  console.log(tempData);
  

  useEffect(() => {
    getWeatherApiCall(selectedCity); //default 1st index lat long set for api call
  }, [selectedCity]);

  if (loader)
    return <StatusSection />
  return <DetailedSection {...{ tempData, selectedCity, setCity }} />;
};

export default App;
