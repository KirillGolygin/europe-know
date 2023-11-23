import "./RegisterSuccessed.scss";

interface RegisterSuccessedtProps {
  closePopup: () => void;
  showSigninPopup: () => void;
}

const RegisterSuccessed = ({
  closePopup,
  showSigninPopup,
}: RegisterSuccessedtProps) => {
  const openSigninPopup = () => {
    closePopup();
    showSigninPopup();
  };
  return (
    <div className="succssed-popup" onClick={closePopup}>
      <div className="succssed-container">
        <h5>Вы успешно прошли регистрацию</h5>
        <button onClick={openSigninPopup}>Войти</button>
      </div>
    </div>
  );
};

export default RegisterSuccessed;
