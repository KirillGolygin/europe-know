import { expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import * as popupActions from "../../redux/popups-slice";
import * as usersActions from "../../redux/users-slice";
import * as CountriesActions from "../../redux/countries-slice";

import Header from "./Header";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");
const mockedOpenPopup = vi.spyOn(popupActions, "openPopup");
const dispatch = vi.fn();

it("render header with Register popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header popup={{ type: "register", isOpen: true }} signinError={"test"} />,
    { wrapper: BrowserRouter }
  );
  expect(component).toMatchSnapshot();
});

it("open register popup by click on register", () => {
  mockedDispatch.mockReturnValue(dispatch);
  render(<Header popup={{ type: "register", isOpen: false }} />, {
    wrapper: BrowserRouter,
  });
  fireEvent.click(screen.getByRole("button", { name: "Register" }));
  expect(dispatch).toBeCalled();
  expect(mockedOpenPopup).toBeCalledWith("register");
});

it("render header with signin popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header popup={{ type: "signin", isOpen: true }} />,
    { wrapper: BrowserRouter }
  );
  expect(component).toMatchSnapshot();
});

it("open signin popup by click on signin", () => {
  mockedDispatch.mockReturnValue(dispatch);
  render(<Header popup={{ type: "signin", isOpen: false }} />, {
    wrapper: BrowserRouter,
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(dispatch).toBeCalled();
  expect(mockedOpenPopup).toBeCalledWith("signin");
});

it("render header with error popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header popup={{ type: "signin", isOpen: false }} signinError="test" />,
    { wrapper: BrowserRouter }
  );
  expect(component).toMatchSnapshot();
});

it("render authorized header", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header
      popup={{ type: "signin", isOpen: false }}
      currentUser={{
        _id: "1",
        favourits: [],
        login: "test",
        password: "Test2",
      }}
    />,
    { wrapper: BrowserRouter }
  );
  expect(component).toMatchSnapshot();
});

it("logout user by clicking logout button", () => {
  mockedDispatch.mockReturnValue(dispatch);
  render(
    <Header
      popup={{ type: "signin", isOpen: false }}
      currentUser={{
        _id: "1",
        favourits: [],
        login: "test",
        password: "Test2",
      }}
    />,
    { wrapper: BrowserRouter }
  );

  const mockedLogout = vi.spyOn(usersActions, "logoutUser");
  const mockedClearFavourites = vi.spyOn(CountriesActions, "clearFavourites");

  fireEvent.click(screen.getByRole("button", { name: "Logout" }));
  expect(dispatch).toBeCalledTimes(4);
  expect(mockedLogout).toBeCalled();
  expect(mockedClearFavourites).toBeCalled();
});

it("check main link", () => {
  render(
    <Header
      popup={{ type: "signin", isOpen: false }}
      currentUser={{
        _id: "1",
        favourits: [],
        login: "test",
        password: "Test2",
      }}
    />,
    { wrapper: BrowserRouter }
  );

  const link = screen.getByRole("link", { name: "Europe.know" });
  expect(link.getAttribute("href")).toEqual("/");
});

it("check my countries link", () => {
  render(
    <Header
      popup={{ type: "signin", isOpen: false }}
      currentUser={{
        _id: "1",
        favourits: [],
        login: "test",
        password: "Test2",
      }}
    />,
    { wrapper: BrowserRouter }
  );

  const link = screen.getByRole("link", { name: "My countries" });
  expect(link.getAttribute("href")).toEqual("/my-countries");
});
