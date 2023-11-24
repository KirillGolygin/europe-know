import { useEffect } from "react";
import { useParams } from "react-router";


import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import {
  getCountryDetails,
  selectPickedCountry,
} from "../../redux/countries-slice";

import Star from "../../components/Star/Star";

import "./CountryDetail.scss";

const CountryDetail = () => {
  const disaptch = useAppDispatch();
  const { country } = useParams();
  const pickedCountry = useAppSelector(selectPickedCountry);

  useEffect(() => {
    if (!country) return;

    disaptch(getCountryDetails(country));
  }, [country, disaptch]);

  if (!pickedCountry) return;

  return (
    <div className="details-container">
      <div className="info-container">
        <div className="name">
          <h3 className="text">{pickedCountry.name.common}</h3>
          <Star
            countryName={pickedCountry.name.common}
            favourite={pickedCountry.favourite}
          />
        </div>

        <div className="info">
          <p className="title">capital:</p>
          <p className="text">{pickedCountry.capital}</p>
        </div>

        <div className="info">
          <p className="title">Currencies:</p>
          <p className="text">
            {pickedCountry.currencies.map((cur) => (
              <span key={cur}>{cur}</span>
            ))}
          </p>
        </div>

        <div className="info">
          <p className="title">Region:</p>
          <p className="text">{pickedCountry.region}</p>
        </div>

        <div className="info">
          <p className="title">Languages:</p>
          <p className="text">
            {pickedCountry.languages.map((lang) => (
              <span key={lang}>{lang} </span>
            ))}
          </p>
        </div>

        <div className="info">
          <p className="title">Population:</p>
          <p className="text">{pickedCountry.population}</p>
        </div>
      </div>
      <div className="pics-container">
        <div className="pic">
          <p className="text">Flag</p>
          <div className="img-container">
            <img
              className="img"
              src={pickedCountry.flags.png}
              alt={pickedCountry.flags.alt}
            />
          </div>
        </div>

        <div className="pic">
          <p className="text">Coat of arms</p>
          <div className="img-container">
            <img
              className="img"
              src={pickedCountry.coatOfArms.png}
              alt={`coat of arms of ${pickedCountry.name.common}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
