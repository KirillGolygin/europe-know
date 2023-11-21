import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import * as reduxHooks from "../../redux/hooks/redux-hooks";
import SignInForm from "./SigInForm";

vi.mock("../../redux/hooks/redux-hooks");

const mockedDispatch = vi.spyOn(reduxHooks, "useAppDispatch");

it("render SigninForm", () => {
  mockedDispatch.mockReturnValue(vi.fn());

  const component = render(<SignInForm closePopup={vi.fn()} />);
  expect(component).toMatchSnapshot();
});
