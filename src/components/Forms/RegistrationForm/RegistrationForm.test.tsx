import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import * as reduxHooks from '../../../redux/hooks/redux-hooks';
import * as api from '../../../api';
import * as popupActions from '../../../redux/popups-slice';

import RegistrationForm from './RegistrationForm';

vi.mock('../../redux/hooks/redux-hooks');
vi.mock('axios');

const mockedDispatch = vi.spyOn(reduxHooks, 'useAppDispatch');
const mockedregUser = vi.spyOn(api, 'regUser');
const closePopup = vi.spyOn(popupActions, 'closePopup');

it('render RegistrationForm', () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<RegistrationForm />);
  expect(component).toMatchSnapshot();
});

it('should display required error when value is invalid', async () => {
  render(<RegistrationForm />);

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(3);

  expect(mockedregUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('');
  expect(screen.getByTestId('password')).toHaveValue('');
  expect(screen.getByTestId('confirm-password')).toHaveValue('');
});

it('should display matching error when email is invalid', async () => {
  render(<RegistrationForm />);

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'Password1234'
    }
  });

  fireEvent.input(screen.getByTestId('confirm-password'), {
    target: {
      value: 'Password1234'
    }
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(1);

  expect(mockedregUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('test');
  expect(screen.getByTestId('password')).toHaveValue('Password1234');
});

it('should display min length error when password is invalid', async () => {
  render(<RegistrationForm />);

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'test@gmail.com'
    }
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'P4ss'
    }
  });

  fireEvent.input(screen.getByTestId('confirm-password'), {
    target: {
      value: 'P4ss'
    }
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(1);

  expect(mockedregUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('test@gmail.com');
  expect(screen.getByTestId('password')).toHaveValue('P4ss');
  expect(screen.getByTestId('confirm-password')).toHaveValue('P4ss');
});

it('should display uppercase and number error when password is invalid', async () => {
  render(<RegistrationForm />);

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'test@gmail.com'
    }
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'asdsadasdaasd'
    }
  });

  fireEvent.input(screen.getByTestId('confirm-password'), {
    target: {
      value: 'asdsadasdaasd'
    }
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(1);

  expect(mockedregUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('test@gmail.com');
  expect(screen.getByTestId('password')).toHaveValue('asdsadasdaasd');
  expect(screen.getByTestId('confirm-password')).toHaveValue('asdsadasdaasd');
});

it('should error when password is unconfirmed', async () => {
  render(<RegistrationForm />);

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'test@gmail.com'
    }
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'Password123'
    }
  });

  fireEvent.input(screen.getByTestId('confirm-password'), {
    target: {
      value: 'pasdasdSA12'
    }
  });

  fireEvent.submit(screen.getByRole('button'));

  expect(await screen.findAllByRole('alert')).toHaveLength(1);

  expect(mockedregUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('test@gmail.com');
  expect(screen.getByTestId('password')).toHaveValue('Password123');
  expect(screen.getByTestId('confirm-password')).toHaveValue('pasdasdSA12');
});

it('should not display error when value is valid', async () => {
  render(<RegistrationForm />);

  fireEvent.input(screen.getByTestId('login'), {
    target: {
      value: 'test@gmail.com'
    }
  });

  fireEvent.input(screen.getByTestId('password'), {
    target: {
      value: 'P4assword'
    }
  });

  fireEvent.input(screen.getByTestId('confirm-password'), {
    target: {
      value: 'P4assword'
    }
  });

  fireEvent.submit(screen.getByRole('button'));

  await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

  expect(closePopup).toBeCalled();

  expect(screen.getByTestId('login')).toHaveValue('');
  expect(screen.getByTestId('password')).toHaveValue('');
  expect(screen.getByTestId('confirm-password')).toHaveValue('');
});
