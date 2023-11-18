import { useAppDispatch } from "../../redux/hooks/redux-hooks";

import { IUser, saveFormData, signinUser } from "../../redux/users-slice";

import FormWrap from "../FormWrap/FormWrap";

import { useForm, SubmitHandler } from "react-hook-form";

interface SigInFormProps {
  closePopup: () => void;
}

interface Inputs extends IUser {}

const SignInForm = ({ closePopup }: SigInFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(saveFormData(data));
    dispatch(signinUser());
    reset();
    closePopup();
  };

  return (
    <FormWrap>
      <h3>Sign in</h3>
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
              <p className="error">{errors.password.message}</p>
            )}
          </label>
        </div>
        <button type="submit">Sign in</button>
      </form>
    </FormWrap>
  );
};

export default SignInForm;
