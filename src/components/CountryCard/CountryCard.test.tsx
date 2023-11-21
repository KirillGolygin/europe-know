import { expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import CountryCard from "./CountryCard";

vi.mock("../../redux/hooks/redux-hooks");
vi.mock("react-router");

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

  expect(component).toMatchSnapshot();
});
