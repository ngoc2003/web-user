import { State } from "country-state-city";
import { useCallback, useMemo } from "react";
import countries from "world-countries";

const formattedCountries = countries.flatMap((country) => {
  const states = State.getStatesOfCountry(country.cca2);

  return states.map((state) => ({
    label: `${state.name}, ${country.name.common}`,
    value: `${state.name}-${country.name.common}`,
    flag: country.flag,
    latlng:
      state?.latitude && state?.longitude
        ? [+state.latitude, +state.longitude]
        : country.latlng,
    region: country.region,
  }));
});

export const useCountries = () => {
  const cities = formattedCountries;

  const getAll = () => cities;

  const getByLatAndLon = useCallback(
    (val: number[]) => {
      const tolerance = 0.01;
      return cities.find((c) => {
        return (
          Math.abs(c.latlng[0] - val[0]) < tolerance &&
          Math.abs(c.latlng[1] - val[1]) < tolerance
        );
      });
    },
    [cities]
  );

  const getByValue = useCallback(
    (value: string) => {
      return !!value
        ? cities.filter((item: any) =>
            item.value.toLowerCase().includes(value.toLowerCase())
          )
        : [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cities.length]
  );
  return {
    getByLatAndLon,
    getAll,
    getByValue,
  };
};
