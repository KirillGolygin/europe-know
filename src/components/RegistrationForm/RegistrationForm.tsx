import { regUser } from "../../api/regUser";
import FormWrap from "../FormWrap/FormWrap";

import { useForm, SubmitHandler } from "react-hook-form";

interface SigInFormProps {
  closePopup: () => void;
}

interface Inputs {
  login: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = ({ closePopup }: SigInFormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    regUser(data);
    closePopup();
    reset();
  };

  return (
    <FormWrap>
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <label>
            login
            <input
              data-testid="login"
              {...register("login", {
                required: "Поле должно быть заполнено",
                pattern: {
                  value: /.+@.+\..+/,
                  message: "Логин должен являться почтой",
                },
              })}
            />
            {errors.login && (
              <p className="error" role="alert">
                {errors.login?.message}
              </p>
            )}
          </label>

          <label>
            password
            <input
              data-testid="password"
              type="password"
              {...register("password", {
                required: "Поле должно быть заполнено",
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать более 6 символов",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                  message:
                    "Пароль должен содержать цифры, Заглавные и строчные латинские буквы",
                },
              })}
            />
            {errors.password && (
              <p className="error" role="alert">
                {errors.password.message}
              </p>
            )}
          </label>

          <label>
            Confirm password
            <input
              data-testid="confirm-password"
              type="password"
              {...register("confirmPassword", {
                required: "Поле должно быть заполнено",
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Пароли не совпадают";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="error" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </FormWrap>
  );
};

export default RegistrationForm;
