import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import FormWrap from "./FormWrap";

vi.mock("../../redux/hooks/redux-hooks");

it("render formWrap", () => {
  const component = render(
    <FormWrap>
      <div>test</div>
    </FormWrap>
  );

  expect(component).toMatchSnapshot();
});
