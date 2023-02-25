import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchFilter from "../components/SearchFilter";
import useHttp from "../hooks/use-http";

import "./HomePage.scss";

const HomePage = () => {
  const [countriesList, setCountriesList] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const applyData = (response) => {
      const countries = response.map((country) => {
        const obj = {
          name: country.name.common,
          flag: country.flags.png,
          population: country.population,
          region: country.region,
          capital: country.capital[0],
        };

        return obj;
      });

      setCountriesList(countries);
    };

    sendRequest(
      `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca2`,
      applyData
    );
  }, [sendRequest]);

  return (
    <div className="home">
      <SearchFilter />
      <main className="home__list">
        {isLoading && "LOADING..."}
        {error
          ? error
          : countriesList.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
      </main>
    </div>
  );
};

export default HomePage;
