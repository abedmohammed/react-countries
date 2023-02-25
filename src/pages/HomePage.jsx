import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchFilter from "../components/SearchFilter";

import "./HomePage.scss";

const HomePage = () => {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const data = await import("../data/data.json");
      // const countries = Array.from(data);

      const data = await fetch(
        `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`
      );
      const response = await data.json();

      const countries = response.map((country) => {
        const obj = {
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital[0],
          flag: country.flags.png,
        };

        return obj;
      });

      setCountriesList(countries);
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <SearchFilter />
      <main className="home__list">
        {countriesList.map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
