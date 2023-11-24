import { vi, it, expect } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';

import RegisterSuccessed from './RegisterSuccessed';

const closePopup = vi.fn();
const showSigninPopup = vi.fn();

it('render RegisterSuccessed correcrly', () => {
  const component = render(
    <RegisterSuccessed closePopup={closePopup} showSigninPopup={showSigninPopup} />
  );

  expect(screen.getByText(/Вы успешно прошли регистрацию/i)).toBeInTheDocument();
  expect(component).toMatchSnapshot();
});

it('open signin popup when click the button', () => {
  render(<RegisterSuccessed closePopup={closePopup} showSigninPopup={showSigninPopup} />);

  fireEvent.click(screen.getByRole('button'));
  expect(closePopup).toBeCalled();
  expect(showSigninPopup).toBeCalled();
});
