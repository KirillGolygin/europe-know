import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import Star from "./Star";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");

it("renders correctly when favourite = false", () => {
  mockedDispatch.mockResolvedValue(vi.fn());

  const component = render(<Star countryName="Russia" favourite={false} />);
  expect(component).toMatchSnapshot();
});

it("renders correctly when favourite = true", () => {
  mockedDispatch.mockResolvedValue(vi.fn());

  const component = render(<Star countryName="Russia" favourite={true} />);
  expect(component).toMatchSnapshot();
});
