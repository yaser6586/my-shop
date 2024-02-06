import React, { useRef } from "react";
import { promises as fs } from "fs";
import SelectCities from "../ui/signUp/SelectCities";

export default async function AddressForm() {
  // const [selectValue, setSelectValue] = React.useState<zip>();

  return (
    <div>
      Address
      <SelectCities />
      {/* <select
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
      </select> */}
    </div>
  );
}
