import { useEffect } from "react";
import { useParams } from "react-router";


import { useAppSelector, useAppDispatch } from "../../redux/hooks/redux-hooks";

import {
  getCountryDetails,
  selectPickedCountry,
} from "../../redux/countries-slice";

import Star from "../../components/Star/Star";
import CountryInfoBlock from "../../components/CountryInfoBlock/CountryInfoBlock";
import CountryInfoPic from "../../components/CountryInfoPic/CountryInfoPic";

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

        <CountryInfoBlock title="Capital" text={pickedCountry.capital} />
        <CountryInfoBlock title="Currencies" text={pickedCountry.currencies} />
        <CountryInfoBlock title="Region" text={pickedCountry.region} />
        <CountryInfoBlock title="Languages" text={pickedCountry.languages} />
        <CountryInfoBlock title="Population" text={pickedCountry.population} />
      </div>

      <div className="pics-container">
        <CountryInfoPic
          title="Flag"
          src={pickedCountry.flags.png}
          alt={pickedCountry.flags.alt}
        />
        <CountryInfoPic
          title="Coat of arms"
          src={pickedCountry.coatOfArms.png}
          alt={`coat of arms of ${pickedCountry.name.common}`}
        />
      </div>
    </div>
  );
};

export default CountryDetail;
