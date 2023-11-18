import { useEffect, useState } from "react";

import { useParams } from "react-router";

import { getCountryInfo } from "../../api";

import { ICountry } from "../../redux/countries-slice";
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
  const [countryInfo, setcountryInfo] = useState<ICountryDetail>();
  const { country } = useParams();

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
      setcountryInfo(prepearedData);
    };

    getInfo();
  }, [country]);

  return (
    <div className="details-container">
      <div className="text">
        <h3 className="name"></h3>
        <div className="info-container">
          <p className="title">capital:</p>
          <p className="text">{countryInfo?.capital}</p>
        </div>

        <div className="info-container">
          <p className="title">Currencies:</p>
          <p className="text">
            {countryInfo?.currencies.map((cur) => (
              <span key={cur}>{cur}</span>
            ))}
          </p>
        </div>

        <div className="info-container">
          <p className="title">Region:</p>
          <p className="text">{countryInfo?.region}</p>
        </div>

        <div className="info-container">
          <p className="title">Languages:</p>
          <p className="text">
            {countryInfo?.languages.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </p>
        </div>

        <div className="info-container">
          <p className="title">Population:</p>
          <p className="text">{countryInfo?.population}</p>
        </div>
      </div>
      <div className="pics"></div>
    </div>
  );
};

export default CountryDetail;
