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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await regUser(data);
    closePopup();
    reset();
    console.log(data);
  };

  return (
    <FormWrap>
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <label>
            login
            <input
              {...register("login", {
                required: "Поле должно быть заполнено",
                pattern: {
                  value: /.+@.+\..+/,
                  message: "Логин должен являться почтой",
                },
              })}
            />
            {errors.login && <p className="error">{errors.login?.message}</p>}
          </label>

          <label>
            password
            <input
              type="password"
              {...register("password", {
                required: "Поле должно быть заполнено",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                  message:
                    "Пароль должен содержать цифры, Заглавные и строчные латинские буквы",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </label>

          <label>
            Confirm password
            <input
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
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </FormWrap>
  );
};

export default RegistrationForm;
