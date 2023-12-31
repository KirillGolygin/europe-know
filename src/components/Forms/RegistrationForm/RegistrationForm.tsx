import { useAppDispatch } from '../../../redux/hooks/redux-hooks';

import { closePopup } from '../../../redux/popups-slice';
import { registerUser, saveRegFormData } from '../../../redux/users-slice';

import { useForm, SubmitHandler } from 'react-hook-form';

import type { IUser } from '../../../interfaces/user';

import '../Form.scss';

interface Inputs extends IUser {
  confirmPassword: string;
}

const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(saveRegFormData(data));
    dispatch(registerUser());
    dispatch(closePopup());
    reset();
  };

  return (
    <div className="form-container">
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-container">
          <label>
            login
            <input
              data-testid="login"
              {...register('login', {
                required: 'Поле должно быть заполнено',
                pattern: {
                  value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Логин должен являться почтой'
                }
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
              {...register('password', {
                required: 'Поле должно быть заполнено',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать более 6 символов'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                  message: 'Пароль должен содержать цифры, Заглавные и строчные латинские буквы'
                }
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
              {...register('confirmPassword', {
                required: 'Поле должно быть заполнено',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Пароли не совпадают';
                  }
                }
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
    </div>
  );
};

export default RegistrationForm;
