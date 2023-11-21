import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import * as reduxHooks from "../../redux/hooks/redux-hooks";

import Selector from "./Selector";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router-dom");

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

it("render selector", () => {
  mockedSelector.mockReturnValue(countries);
  const component = render(<Selector />);

  expect(component).toMatchSnapshot();
});
