import { expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import * as popupActions from "../../redux/popups-slice";
import * as CuntriesActions from "../../redux/countries-slice";
import Star from "./Star";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");
const mockedUseSelector = vi.spyOn(reduxHooks, "useAppSelector");

it("renders correctly when favourite = false", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<Star countryName="Russia" favourite={false} />);
  expect(component).toMatchSnapshot();
});

it("renders correctly when favourite = true", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<Star countryName="Russia" favourite={true} />);
  expect(component).toMatchSnapshot();
});

it("call open popup if not signed in", () => {
  const dispatch = vi.fn();
  mockedDispatch.mockReturnValue(dispatch);
  mockedUseSelector.mockReturnValue(null);

  const mockedOpenPopup = vi.spyOn(popupActions, "openPopup");

  render(<Star countryName="Russia" favourite={false} />);

  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(dispatch).toBeCalledTimes(1);
  expect(mockedOpenPopup).toBeCalled();
});

it("call changeFavourites if signed in", () => {
  const dispatch = vi.fn();
  mockedDispatch.mockReturnValue(dispatch);
  mockedUseSelector.mockReturnValue(true);

  const mockedChangeFavurites = vi.spyOn(CuntriesActions, "changeFavourites");

  render(<Star countryName="Russia" favourite={false} />);

  const btn = screen.getByRole("button");
  fireEvent.click(btn);
  expect(dispatch).toBeCalledTimes(1);
  expect(mockedChangeFavurites).toBeCalled();
});
