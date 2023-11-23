import { useAppDispatch } from "../../../redux/hooks/redux-hooks";

import { saveSigninFormData, signinUser } from "../../../redux/users-slice";
import { closePopup } from "../../../redux/popups-slice";

import { useForm, SubmitHandler } from "react-hook-form";

import type { IUser } from "../../../interfaces/user";

import "../Form.scss";

interface Inputs extends IUser {}

const SignInForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(saveSigninFormData(data));
    dispatch(signinUser());
    reset();
    dispatch(closePopup());
  };

  return (
    <div className="form-container">
      <h3>Sign in</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <label>
            login
            <input
              data-testid="login"
              {...register("login", {
                required: "Поле должно быть заполнено",
                pattern: {
                  value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Логин должен являться почтой",
                },
              })}
            />
            {errors.login && (
              <p role="alert" className="error">
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
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SignInForm;
