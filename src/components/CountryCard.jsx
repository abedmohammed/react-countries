import React from "react";
import { Link } from "react-router-dom";

import "./CountryCard.scss";

const CountryCard = ({ country }) => {
  return (
    <article className="card">
      <Link to={`/${country.name}`}>
        <div className="card__flag">
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
        <div className="card__details">
          <h2 className="card__name">{country.name}</h2>
          <div className="card__stat">
            <h3>Population:</h3>
            <p>{country.population}</p>
          </div>
          <div className="card__stat">
            <h3>Region:</h3>
            <p>{country.region}</p>
          </div>
          <div className="card__stat">
            <h3>Capital:</h3>
            <p>{country.capital}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CountryCard;
