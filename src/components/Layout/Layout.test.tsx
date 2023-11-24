import { expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import * as reduxHooks from '../../redux/hooks/redux-hooks';

import Layout from './Layout';

vi.mock('../../redux/hooks/redux-hooks');
vi.mock('react-router-dom');

const mockedSelector = vi.spyOn(reduxHooks, 'useAppSelector');

it('render layout', () => {
  mockedSelector.mockReturnValue(false);
  const component = render(<Layout />);

  expect(component).toMatchSnapshot();
});
