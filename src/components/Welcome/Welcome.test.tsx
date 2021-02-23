import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Welcome from "./Welcome";
import { findByTestAttr } from "../../Utils";

const setUp = () => {
  const component = shallow(<Welcome />);
  return component;
};

describe("Welcome Component", () => {
  let component: ShallowWrapper<any, Readonly<{}>>;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "welcome");
    expect(wrapper.length).toBe(1);
  });

  it("should render a logo", () => {
    const logo = findByTestAttr(component, "welcomeForm");
    expect(logo.length).toBe(1);
  });
});
