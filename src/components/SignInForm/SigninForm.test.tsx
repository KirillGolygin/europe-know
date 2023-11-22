import { expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import * as userActions from "../../redux/users-slice";
import SignInForm from "./SigInForm";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");
const mockedSaveFormData = vi.spyOn(userActions, "saveFormData");
const mockedSigninUser = vi.spyOn(userActions, "signinUser");
const closePopup = vi.fn();

it("render SigninForm", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<SignInForm closePopup={closePopup} />);
  expect(component).toMatchSnapshot();
});

it("should display required error when value is invalid", async () => {
  render(<SignInForm closePopup={closePopup} />);

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findAllByRole("alert")).toHaveLength(2);

  expect(mockedSaveFormData).not.toBeCalled();
  expect(mockedSigninUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId("login")).toHaveValue("");
  expect(screen.getByTestId("password")).toHaveValue("");
});

it("should display matching error when email is invalid", async () => {
  render(<SignInForm closePopup={closePopup} />);

  fireEvent.input(screen.getByTestId("login"), {
    target: {
      value: "test",
    },
  });

  fireEvent.input(screen.getByTestId("password"), {
    target: {
      value: "Password1234",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findAllByRole("alert")).toHaveLength(1);

  expect(mockedSaveFormData).not.toBeCalled();
  expect(mockedSigninUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId("login")).toHaveValue("test");
  expect(screen.getByTestId("password")).toHaveValue("Password1234");
});

it("should display min length error when password is invalid", async () => {
  render(<SignInForm closePopup={closePopup} />);

  fireEvent.input(screen.getByTestId("login"), {
    target: {
      value: "test@gmail.com",
    },
  });

  fireEvent.input(screen.getByTestId("password"), {
    target: {
      value: "P4ss",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findAllByRole("alert")).toHaveLength(1);

  expect(mockedSaveFormData).not.toBeCalled();
  expect(mockedSigninUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId("login")).toHaveValue("test@gmail.com");
  expect(screen.getByTestId("password")).toHaveValue("P4ss");
});

it("should display uppercase and number error when password is invalid", async () => {
  render(<SignInForm closePopup={closePopup} />);

  fireEvent.input(screen.getByTestId("login"), {
    target: {
      value: "test@gmail.com",
    },
  });

  fireEvent.input(screen.getByTestId("password"), {
    target: {
      value: "asdsadasdaasd",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findAllByRole("alert")).toHaveLength(1);

  expect(mockedSaveFormData).not.toBeCalled();
  expect(mockedSigninUser).not.toBeCalled();
  expect(closePopup).not.toBeCalled();

  expect(screen.getByTestId("login")).toHaveValue("test@gmail.com");
  expect(screen.getByTestId("password")).toHaveValue("asdsadasdaasd");
});

it("should not display error when value is valid", async () => {
  render(<SignInForm closePopup={closePopup} />);

  fireEvent.input(screen.getByTestId("login"), {
    target: {
      value: "test@gmail.com",
    },
  });

  fireEvent.input(screen.getByTestId("password"), {
    target: {
      value: "P4assword",
    },
  });

  fireEvent.submit(screen.getByRole("button"));

  await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));

  expect(mockedSaveFormData).toBeCalledWith({
    login: "test@gmail.com",
    password: "P4assword",
  });
  expect(mockedSigninUser).toBeCalled();
  expect(closePopup).toBeCalled();

  expect(screen.getByTestId("login")).toHaveValue("");
  expect(screen.getByTestId("password")).toHaveValue("");
});
