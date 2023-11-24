import './CountryInfoPic.scss';

interface CountryInfoBlockProps {
  title: string;
  src: string;
  alt: string;
}

const CountryInfoPic = ({ title, src, alt }: CountryInfoBlockProps) => {
  return (
    <div className="pic">
      <p className="text">{title}</p>
      <div className="img-container">
        <img className="img" src={src} alt={alt} />
      </div>
    </div>
  );
};

export default CountryInfoPic;
