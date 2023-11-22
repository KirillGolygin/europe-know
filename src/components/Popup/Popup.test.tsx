import { it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Popup from "./Popup";

it("render Popup", () => {
  const component = render(
    <Popup closePopup={vi.fn()}>
      <div>test</div>
    </Popup>
  );

  expect(screen.getByTestId("popup")).toBeInTheDocument();
  expect(component).matchSnapshot();
});

it("close popup by clicking on backdrop", () => {
  const closePopup = vi.fn();

  render(
    <Popup closePopup={closePopup}>
      <div>test</div>
    </Popup>
  );

  fireEvent.click(screen.getByTestId("popup"));
  expect(closePopup).toBeCalled();
});

it("don't close popup by clicking on items inside", () => {
  const closePopup = vi.fn();

  render(
    <Popup closePopup={closePopup}>
      <div>test</div>
    </Popup>
  );

  fireEvent.click(screen.getByTestId("popup-content"));
  expect(closePopup).not.toBeCalled();
});