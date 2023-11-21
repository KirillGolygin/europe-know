import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import Header from "./Header";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router-dom");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");

it("render header with Register popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header popup={{ type: "register", isOpen: true }} signinError={"test"} />
  );
  expect(component).toMatchSnapshot();
});

it("render header with signin popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<Header popup={{ type: "signin", isOpen: true }} />);
  expect(component).toMatchSnapshot();
});

it("render header with error popup", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(
    <Header popup={{ type: "signin", isOpen: false }} signinError="test" />
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
    />
  );
  expect(component).toMatchSnapshot();
});
