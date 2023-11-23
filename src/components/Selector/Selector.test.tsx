import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import * as countriesActions from "../../redux/countries-slice";
import * as reactRouterHooks from "react-router";

import Selector from "./Selector";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router-dom");

const mockedSortCountries = vi.spyOn(countriesActions, "sortCountries");
const mockedUpdateFavourites = vi.spyOn(countriesActions, "updateFavorites");

const countries = [
  {
    name: { common: "test" },
    capital: "test",
    flags: { png: "https://flagcdn.com/w320/al.png" },
  },
  {
    name: { common: "test" },
    capital: "test",
    flags: { png: "https://flagcdn.com/w320/al.png" },
  },
];

const mockedSelector = vi.spyOn(reduxHooks, "useAppSelector");
const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");
const mockedUseNavigate = vi.spyOn(reactRouterHooks, "useNavigate");
const dispatch = vi.fn();
const navigate = vi.fn();
mockedUseNavigate.mockReturnValue(navigate);

it("render selector", () => {
  mockedSelector.mockReturnValue(countries);
  const component = render(<Selector />);

  expect(component).toMatchSnapshot();
});

it("input sort cards and countries inside selector correctly", async () => {
  mockedDispatch.mockReturnValue(dispatch);

  render(<Selector />);

  fireEvent.input(screen.getByRole("combobox"), {
    target: {
      value: "Russia",
    },
  });

  await waitFor(() => expect(dispatch).toBeCalledTimes(2));
  expect(mockedSortCountries).toBeCalledWith("Russia");
  expect(mockedUpdateFavourites).toBeCalled();
});