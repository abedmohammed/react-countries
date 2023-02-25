import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";

import "./CountryPage.scss";

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState();

  const [isLoading, error, sendRequest] = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      const [countryData] = data;

      const generateCurrencies = (currencies) => {
        const names = [];
        for (const currency in currencies) {
          names.push(currencies[currency].name);
        }
        return names;
      };

      const generateLanugages = (languages) => {
        const names = [];
        for (const language in languages) {
          names.push(languages[language]);
        }
        return names;
      };

      const obj = {
        name: countryData.name.common,
        flag: countryData.flags.png,
        population: countryData.population,
        region: countryData.region,
        subRegion: countryData.subregion,
        capital: countryData.capital[0],
        topLevelDomain: countryData.topLevelDomain,
        currencies: generateCurrencies(countryData.currencies),
        languages: generateLanugages(countryData.languages),
      };

      setCountry(obj);
    };

    sendRequest(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`,
      applyData
    );
  }, [sendRequest]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="country">
        <div className="country__flag">
          <img src={country?.flag} alt={`${country?.name} flag`} />
        </div>
        <div className="country__details">
          <h2 className="country__name">{country?.name}</h2>
          <div className="country__stats">
            <div className="country__stat">
              <h3>Population:</h3>
              <p>{country?.population}</p>
            </div>
            <div className="country__stat">
              <h3>Region:</h3>
              <p>{country?.region}</p>
            </div>
            <div className="country__stat">
              <h3>Sub Region:</h3>
              <p>{country?.subRegion}</p>
            </div>
            <div className="country__stat">
              <h3>Capital:</h3>
              <p>{country?.capital}</p>
            </div>
            <div className="country__stat">
              <h3>Top Level Domain:</h3>
              <p>{country?.topLevelDomain}</p>
            </div>
            <div className="country__stat">
              <h3>Currencies:</h3>
              <p>{country?.languages}</p>
            </div>
            <div className="country__stat">
              <h3>Languages:</h3>
              <p>{country?.currencies}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CountryPage;
