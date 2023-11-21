import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import RegistrationForm from "./RegistrationForm";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");

it("render RegistrationForm", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<RegistrationForm closePopup={vi.fn()} />);
  expect(component).toMatchSnapshot();
});
