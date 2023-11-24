import { expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import * as reduxHooks from '../../redux/hooks/redux-hooks';
import FavouritesList from './FavouritesList';

vi.mock('../../redux/hooks/redux-hooks');
vi.mock('react-router');

const mockedUseSelector = vi.spyOn(reduxHooks, 'useAppSelector');

const cards = [
  {
    name: { common: 'test1' },
    capital: 'test',
    flags: { png: 'https://flagcdn.com/w320/al.png' }
  },
  {
    name: { common: 'test2' },
    capital: 'test',
    flags: { png: 'https://flagcdn.com/w320/al.png' }
  }
];

it('render empty favourites list', () => {
  mockedUseSelector.mockReturnValue([]);
  const component = render(<FavouritesList />);

  expect(component).toMatchSnapshot();
});

it('render favourites list with cards', () => {
  mockedUseSelector.mockReturnValue(cards);

  const component = render(<FavouritesList />);

  expect(component).toMatchSnapshot();
});
