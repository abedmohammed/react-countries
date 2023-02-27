import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";

import "./CountryPage.scss";

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState();

  const { isLoading, sendRequest } = useHttp();
  const { isLoading: isBorderLoading, sendRequest: sendBordersRequest } =
    useHttp();

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
      const generateLanguages = (languages) => {
        const names = [];
        for (const language in languages) {
          names.push(languages[language]);
        }
        return names;
      };
      const generateBorderNames = (countryCodes) => {
        const names = [];
        const getName = (data) => {
          const {
            name: { common },
          } = data;
          names.push(common);

          setCountry((previousState) => {
            return { ...previousState, borders: names };
          });
        };

        countryCodes.forEach((code) => {
          sendBordersRequest(
            `https://restcountries.com/v3.1/alpha/${code}?fields=name`,
            getName
          );
        });
      };

      const obj = {
        name: countryData.name.common,
        flag: countryData.flags.svg,
        population: countryData.population,
        region: countryData.region,
        subRegion: countryData.subregion,
        capital: countryData.capital && countryData.capital[0],
        topLevelDomain: countryData.tld[0],
        currencies: generateCurrencies(countryData.currencies),
        languages: generateLanguages(countryData.languages),
      };

      countryData.borders && generateBorderNames(countryData.borders);
      setCountry(obj);
    };

    sendRequest(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`,
      applyData
    );
  }, [sendRequest, sendBordersRequest, countryName]);

  if (isLoading || !country?.name) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Link to={`/`} className="back_btn">
        &larr; Back
      </Link>
      <main className="country">
        <div className="country__flag">
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
        <div className="country__details">
          <h2 className="country__name">{country.name}</h2>
          <div className="country__stats">
            {country.population && (
              <div className="country__stat">
                <h3>Population:</h3>
                <p>{country.population.toLocaleString()}</p>
              </div>
            )}
            {country.region && (
              <div className="country__stat">
                <h3>Region:</h3>
                <p>{country.region}</p>
              </div>
            )}
            {country.subRegion && (
              <div className="country__stat">
                <h3>Sub Region:</h3>
                <p>{country.subRegion}</p>
              </div>
            )}
            {country.capital && (
              <div className="country__stat">
                <h3>Capital:</h3>
                <p>{country.capital}</p>
              </div>
            )}
            {country.topLevelDomain && (
              <div className="country__stat">
                <h3>Top Level Domain:</h3>
                <p>{country.topLevelDomain}</p>
              </div>
            )}
            {country.currencies && (
              <div className="country__stat">
                <h3>Currencies:</h3>
                <p>{country.currencies.join(", ")}</p>
              </div>
            )}
            {country.languages && (
              <div className="country__stat">
                <h3>Languages:</h3>
                <p>{country.languages.join(", ")}</p>
              </div>
            )}
          </div>

          {country.borders && (
            <div className="country__borders">
              <h3>Border Countries:</h3>
              {isBorderLoading
                ? "Loading..."
                : country.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CountryPage;
