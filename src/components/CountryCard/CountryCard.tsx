import Star from "../Star/Star";

import "./CountryCard.scss";

interface CountryCardProps {
  name: string;
  capital: string;
  flag: {
    png: string;
    svg: string;
    alt: string;
  };
  favourite: boolean;
}

const CountryCard = ({ capital, name, flag, favourite }: CountryCardProps) => {
  return (
    <div className="card">
      <img className="flag" src={flag.png} alt={flag.alt} />
      <div className="info">
        <h2 className="name">{name}</h2>
        <div className="capital-container">
          <div className="capital-text">
            <p>Capital:</p>
            <p className="capital-name">{capital}</p>
          </div>
          <Star countryName={name} favourite={favourite} />
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
