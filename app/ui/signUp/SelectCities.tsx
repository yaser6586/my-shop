"use client";
import React from "react";
import { CitiesName } from "../../lib/iranstates";
interface zip {
  name: string;
  counties: string[];
}
export default function SelectCities({}) {
  const [selectValue, setSelectValue] = React.useState<zip>();

  return (
    <div>
      <select
        name="city"
        id="city"
        defaultValue={"--city--"}
        onChange={(e) => {
          const { value } = e.target;
          const county = CitiesName.find((city) => city.name === value);
          setSelectValue(county!);
          console.log(value);
        }}
      >
        {!selectValue && <option value="--city--">--city--</option>}
        {CitiesName.map((city, i) => (
          <option key={i} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <select
        name="subCity"
        id="subCity"
        defaultValue={"--counties--"}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        {selectValue?.counties.map((city, i) => (
          <option key={i} value={city}>
            {city}
          </option>
        ))}
        {!selectValue && <option value="--counties--">--counties--</option>}
      </select>
    </div>
  );
}
