import { it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import SigninError from './SigninError';

it('render SignInError', () => {
  const component = render(<SigninError closePopup={vi.fn()} errorMessage={'test'} />);

  expect(component).matchSnapshot();
});
