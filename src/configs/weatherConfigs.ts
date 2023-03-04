export const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function deStructureWeatherDetails(tempData: any) {
  let dateList: string[] = tempData?.hourly?.time?.length
    ? [
        ...(new Set(
          tempData?.hourly?.time.map((e: string) => e.substring(0, 10))
        ) as any),
      ]
    : [];

  let hourWise = dateList.length
    ? tempData.hourly.time.map((e: any, i: number) => {
        let tm = Number(e.split("T")[1].substring(0, 2));
        return {
          date: e,
          day: `${monthList[Number(e.substring(5, 7)) - 1]} ${e.substring(
            8,
            10
          )}`,
          time:
            tm === 0
              ? "12 AM"
              : tm === 12
              ? "12 PM"
              : tm > 12
              ? tm - 12 + "PM"
              : tm + " AM",
          temp:
            tempData.hourly.temperature_2m[i] +
              tempData.hourly_units.temperature_2m ?? "",
          wind:
            tempData.hourly.windspeed_10m[i] +
              tempData.hourly_units.windspeed_10m ?? "",
        };
      })
    : [];

  return dateList.length
    ? dateList.map((e) =>
        hourWise.filter((eT: any) => e === eT.date.substring(0, 10))
      )
    : [];
}