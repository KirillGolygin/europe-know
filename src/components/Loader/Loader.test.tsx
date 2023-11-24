import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

import Loader from './Loader';

it('render Loader', () => {
  const component = render(<Loader />);

  expect(component).matchSnapshot();
});
