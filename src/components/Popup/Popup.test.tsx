import { it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

import Popup from "./Popup";

it("render Popup", () => {
  const component = render(
    <Popup closePopup={vi.fn()}>
      <div>test</div>
    </Popup>
  );

  expect(component).matchSnapshot();
});
