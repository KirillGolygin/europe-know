import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getCountryInfo } from "../../api";

import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import {
  ICountry,
  pickCountry,
  selectPickedCountry,
} from "../../redux/countries-slice";
import Star from "../../components/Star/Star";

import "./CountryDetail.scss";

interface ICountryDetail extends ICountry {
  population: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  currencies: string[];
  region: string;
  languages: string[];
}

const CountryDetail = () => {
  const dispatch = useAppDispatch();
  const { country } = useParams();
  const pickedCountry = useAppSelector(selectPickedCountry);

  useEffect(() => {
    if (!country) return;

    const getInfo = async () => {
      const response = await getCountryInfo(country);
      const data = response.data[0];

      const languages = [];
      for (const lang in data.languages) {
        languages.push(data.languages[lang]);
      }

      const prepearedData: ICountryDetail = {
        ...data,
        currencies: Object.keys(data.currencies),
        languages: languages,
        favourite: false,
        population: data.population.toLocaleString("ru"),
      };

      dispatch(pickCountry(prepearedData));
    };

    getInfo();
  }, [dispatch, country]);

  if (!pickedCountry) return;
  return (
    <div className="details-container">
      <div className="text">
        <div className="name">
          <h3 className="text"></h3>
          <Star
            countryName={pickedCountry.name.common}
            favourite={pickedCountry.favourite}
          />
        </div>

        <div className="info-container">
          <p className="title">capital:</p>
          <p className="text">{pickedCountry.capital}</p>
        </div>

        <div className="info-container">
          <p className="title">Currencies:</p>
          <p className="text">
            {pickedCountry.currencies.map((cur) => (
              <span key={cur}>{cur}</span>
            ))}
          </p>
        </div>

        <div className="info-container">
          <p className="title">Region:</p>
          <p className="text">{pickedCountry.region}</p>
        </div>

        <div className="info-container">
          <p className="title">Languages:</p>
          <p className="text">
            {pickedCountry.languages.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </p>
        </div>

        <div className="info-container">
          <p className="title">Population:</p>
          <p className="text">{pickedCountry.population}</p>
        </div>
      </div>
      <div className="pics"></div>
    </div>
  );
};

export default CountryDetail;
