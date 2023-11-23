import { expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as reactRouterHooks from "react-router";

import CountryCard from "./CountryCard";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router");

const navigate = vi.fn();
const mockedUseNavigate = vi.spyOn(reactRouterHooks, "useNavigate");
mockedUseNavigate.mockReturnValue(navigate);

it("render countryCard", () => {
  const component = render(
    <CountryCard
      capital="Tirana"
      name="Albania"
      flag={{
        png: "https://flagcdn.com/w320/al.png",
        alt: "Albania flag",
        svg: "",
      }}
      favourite={false}
    />
  );
  expect(screen.getByText("Albania")).toBeInTheDocument();
  expect(component).toMatchSnapshot();
});

it("call navigate by clicking on name", () => {
  render(
    <CountryCard
      capital="Tirana"
      name="Albania"
      flag={{
        png: "https://flagcdn.com/w320/al.png",
        alt: "Albania flag",
        svg: "",
      }}
      favourite={false}
    />
  );

  const name = screen.getByRole("heading");
  expect(name).toBeInTheDocument();
  fireEvent.click(name);
  expect(navigate).toBeCalledWith("/Albania");
});
