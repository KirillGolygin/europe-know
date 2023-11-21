import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import CountriesList from "./CountriesList";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router");

const mockedUseSelector = vi.spyOn(reduxHooks, "useAppSelector");
const cards = [
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

it("render loader while loading countries", () => {
  mockedUseSelector.mockReturnValue([]);

  const component = render(<CountriesList loading={true} />);

  expect(component).toMatchSnapshot();
});

it("render cards", () => {
  mockedUseSelector.mockReturnValue(cards);

  const component = render(<CountriesList loading={false} />);

  expect(component).toMatchSnapshot();
});
