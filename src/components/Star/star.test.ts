import renderer from "react-test-renderer";
import Star from "./Star";

it("renders correctly when favourite = false", () => {
  const component = renderer.create(
    Star({ countryName: "Russia", favourite: false })
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
