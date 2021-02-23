import React from "react";
import Login from "./Login";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../../Utils";

const setUp = (props = {}) => {
  const component = shallow(<Login {...props} />);
  return component;
};

describe("Login Component", () => {
  let component: ShallowWrapper<any, Readonly<{}>>;
  beforeEach(() => {
    component = setUp();
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "login");
    expect(wrapper.length).toBe(1);
  });

  it("should render the Submit Button", () => {
    const button = findByTestAttr(component, "submitInput");
    expect(button.length).toBe(1);
  });

  it("check email input field", () => {
    const wrapper = shallow(<Login />);
    let emailInput = wrapper.find("input").first();
    emailInput.simulate("change", {
      target: { value: "testUser@email.com" },
    });
    emailInput = wrapper.find("input").first();
    expect(emailInput.props().value).toEqual("testUser@email.com");
  });

  it("checks password input field", () => {
    let passwordInput = findByTestAttr(component, "passwordInput");
    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });
    passwordInput = findByTestAttr(component, "passwordInput");
    expect(passwordInput.props().value).toEqual("Test12345");
  });

  it("gives error - when form is submitted without email", () => {
    let passwordInput = findByTestAttr(component, "passwordInput");
    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "login");
    form.simulate("submit", fakeEvent);
    const emailError = findByTestAttr(component, "emailValidationError").text();
    expect(emailError).toBe("*Please Enter a valid Email");
  });

  it("gives error - when form is submitted with invalid email", () => {
    let passwordInput = findByTestAttr(component, "passwordInput");
    let emailInput = findByTestAttr(component, "emailInput");
    emailInput.simulate("change", {
      target: { value: "testEmailemail" },
    });
    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "login");
    form.simulate("submit", fakeEvent);
    const emailError = findByTestAttr(component, "emailValidationError").text();
    expect(emailError).toBe("*Please Enter a valid Email");
  });

  it("gives error - when form is submitted without password", () => {
    let emailInput = findByTestAttr(component, "emailInput");
    emailInput.simulate("change", {
      target: { value: "testEmail@email.com" },
    });
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "login");
    form.simulate("submit", fakeEvent);
    const passwordError = findByTestAttr(
      component,
      "passwordValidationError",
    ).text();
    expect(passwordError).toBe(
      "*Password must be of lenght 8 and contain atleast one uppercase, a lowercase and a number",
    );
  });

  it("gives error - when form is submitted with invalid password", () => {
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");
    emailInput.simulate("change", {
      target: { value: "testEmailemail.com" },
    });
    passwordInput.simulate("change", {
      target: { value: "Test" },
    });
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "login");
    form.simulate("submit", fakeEvent);
    const passwordError = findByTestAttr(
      component,
      "passwordValidationError",
    ).text();
    expect(passwordError).toBe(
      "*Password must be of lenght 8 and contain atleast one uppercase, a lowercase and a number",
    );
  });
});
