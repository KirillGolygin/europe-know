import "./CountryInfoBlock.scss";

interface CountryInfoBlockProps {
  title: string;
  text: string[] | string;
}

const CountryInfoBlock = ({ title, text }: CountryInfoBlockProps) => {
  return (
    <div className="info">
      <p className="title">{title}:</p>
      {typeof text === "string" ? (
        <p className="text">{text}</p>
      ) : (
        <p className="text">
          {text.map((el) => (
            <span key={el}>{el} </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default CountryInfoBlock;
