import { useState } from "react";
import { TN_Coor_DataSet } from "../constants/TN_Coor";
import { FailureSection } from "./failure";

export const DetailedSection = ({
  tempData,
  selectedCity,
  setCity,
}: any) => {
  const [search, setSearch] = useState<string>(selectedCity.name ?? "");
  const [showList, setShowList] = useState<boolean>(false);
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;

  let list =
    search.length && !TN_Coor_DataSet.find((e) => e.name === search)
      ? TN_Coor_DataSet.filter((e) =>
          e.name.toLowerCase().startsWith(search.toLowerCase())
        )
      : TN_Coor_DataSet;

  return (
    <div className="p-5">
      {tempData.length ? (
        <div className="flex p-2 flex-col w-full border-2 rounded-lg border-blue-500 bg-sky-100">
          <div className="flex flex-row flex-wrap relative">
            <div className="flex-1 px-2 pt-4 font-bold text-2xl text-blue-700">
              Weather Forecast
            </div>
            <img
              src={isDayTime ? "/sun.png" : "/moon.png"}
              className="absolute right-12 top-5 w-24"
              alt="dayNightIcon"
            />
          </div>
          <span className="pt-4 px-4">
            <span className="font-bold"> Current temperature :</span>{" "}
            {tempData?.current_weather?.temperature}
            {tempData?.hourly_units?.temperature_2m}
          </span>
          <div className="flex flex-row flex-wrap pt-4">
            <div className="pb-4 px-4">
              <span className="">
                <span className="font-bold">Current windspeed :</span>{" "}
                {tempData?.current_weather?.windspeed}
                {tempData?.hourly_units?.windspeed_10m}
              </span>
            </div>
            <div className="font-semibold pb-4 px-4 relative">
              City {" : "}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowList(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowList(false);
                  }, 200)
                }
                className="text-center"
              />
              {showList ? (
                <div className="border bg-slate-200 absolute top-6 right-4 w-[72%] overflow-y-scroll max-h-[300px]">
                  {list.map((e: any, i) => (
                    <div
                      key={i.toString()}
                      onClick={() => {
                        setSearch(e.name);
                        setCity(e);
                        console.log("djsbksdn", e);
                      }}
                      className="border-b border-slate-400 p-2"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {tempData.map((eachDay: any, i: number) => {
            return (
              <div className="flex flex-row items-center" key={i.toString()}>
                <div className="p-3 text-center text-gray-700 font-semibold">
                  {eachDay[0].day}
                </div>
                <div className="flex flex-row overflow-x-scroll border border-black shadow-md bg-white">
                  {eachDay.map((eachHour: any) => {
                    return (
                      <div key={eachHour.date} className="p-1 border min-w-max">
                        <div className="flex flex-col px-4 p-3 border min-w-max items-center  text-center">
                          <div className="text-slate-500 text-sm min-w-[50px]">
                            {eachHour.time}
                          </div>
                          <div className="font-bold">{eachHour.temp}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <FailureSection />
      )}
    </div>
  );
};
