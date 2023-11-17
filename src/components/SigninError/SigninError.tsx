import "./SigninError.scss";

interface SigninErrorProps {
  errorMessage: string | null;
  closePopup: () => void;
}

const SigninError = ({ errorMessage, closePopup }: SigninErrorProps) => {
  return (
    <div className="error-popup" onClick={closePopup}>
      <div className="error-container">
        <h5>Ошибка</h5>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default SigninError;
