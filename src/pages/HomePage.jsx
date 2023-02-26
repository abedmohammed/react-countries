import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchFilter from "../components/SearchFilter";
import useHttp from "../hooks/use-http";

import "./HomePage.scss";

const HomePage = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  const applyFilter = (filterText = "") => {
    if (filterText.trim() === "") {
      setfilteredCountries(countriesList);
    }
    setfilteredCountries(
      countriesList.filter((country) => {
        const { name } = country;
        return name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(filterText);
      })
    );
  };

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
      setfilteredCountries(countries);
    };

    sendRequest(
      `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca2`,
      applyData
    );
  }, [sendRequest]);

  return (
    <div className="home">
      <SearchFilter applyFilter={applyFilter} />
      <main className="home__list">
        {isLoading && "LOADING..."}
        {error
          ? error
          : filteredCountries.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
      </main>
    </div>
  );
};

export default HomePage;
