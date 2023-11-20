import { useEffect } from "react";
import { useParams } from "react-router";

import { getCountryInfo } from "../../api";

import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import {
  ICountry,
  pickCountry,
  selectPickedCountry,
  updateFavorites,
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
        population: data.population.toLocaleString("ru"),
      };

      dispatch(pickCountry(prepearedData));
      dispatch(updateFavorites());
    };

    getInfo();
  }, [dispatch, country]);

  if (!pickedCountry) return;

  console.log(pickedCountry.favourite);
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
              <span key={lang}>{lang}</span>
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
