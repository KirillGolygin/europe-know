import { expect, it, vi, describe } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import CountriesList from "./CountriesList";

vi.mock("../../redux/hooks/redux-hooks");

const mockedUseSelector = vi.spyOn(reduxHooks, "useAppSelector");

it("render loader while loading countries", () => {
  mockedUseSelector.mockReturnValue(true);

  const component = render(<CountriesList />);

  expect(component).toMatchSnapshot();
});
