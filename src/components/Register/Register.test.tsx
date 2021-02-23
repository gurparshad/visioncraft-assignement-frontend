import React from "react";
import Register from "./Register";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../../Utils";

const setUp = (props = {}) => {
  const component = shallow(<Register {...props} />);
  return component;
};

describe("Register component", () => {
  let component: ShallowWrapper<any, Readonly<{}>>;
  beforeEach(() => {
    component = setUp();
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "register");
    expect(wrapper.length).toBe(1);
  });

  it("should render the Submit Button", () => {
    const button = findByTestAttr(component, "submitInput");
    expect(button.length).toBe(1);
  });

  it("check firstName input field", () => {
    const wrapper = shallow(<Register />);
    let firstNameInput = wrapper.find("input").first();
    firstNameInput.simulate("change", {
      target: { value: "testUser" },
    });
    firstNameInput = wrapper.find("input").first();
    expect(firstNameInput.props().value).toEqual("testUser");
  });

  it("lets user fill out the registration form", () => {
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    firstNameInput = findByTestAttr(component, "firstNameInput");

    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });

    lastNameInput = findByTestAttr(component, "lastNameInput");

    emailInput.simulate("change", {
      target: { value: "testEmail@email.com" },
    });

    emailInput = findByTestAttr(component, "emailInput");

    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });

    passwordInput = findByTestAttr(component, "passwordInput");

    expect(firstNameInput.props().value).toEqual("testFirstName");
    expect(lastNameInput.props().value).toEqual("testLastName");
    expect(emailInput.props().value).toEqual("testEmail@email.com");
    expect(passwordInput.props().value).toEqual("Test12345");
  });

  it("gives error - when form is submitted without firstname", () => {
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");
    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });
    emailInput.simulate("change", {
      target: { value: "testEmail@email.com" },
    });
    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
    form.simulate("submit", fakeEvent);
    const firstNameError = findByTestAttr(
      component,
      "firstNameValidationError",
    ).text();
    expect(firstNameError).toBe("*Please Enter the firstName");
  });

  it("gives error - when form is submitted without lastname", () => {
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    emailInput.simulate("change", {
      target: { value: "testEmail@email.com" },
    });

    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });

    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
    form.simulate("submit", fakeEvent);
    const lastNameError = findByTestAttr(
      component,
      "lastNameValidationError",
    ).text();
    expect(lastNameError).toBe("*Please Enter the lastName");
  });

  it("gives error - when form is submitted without email", () => {
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });

    emailInput.simulate("change", {
      target: { value: "" },
    });

    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });

    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
    form.simulate("submit", fakeEvent);
    const emailError = findByTestAttr(component, "emailValidationError").text();
    expect(emailError).toBe("*Please Enter a valid Email");
  });

  it("gives error - when form is submitted with invalid email", () => {
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });

    emailInput.simulate("change", {
      target: { value: "testEmailemail" },
    });

    passwordInput.simulate("change", {
      target: { value: "Test12345" },
    });

    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
    form.simulate("submit", fakeEvent);
    const emailError = findByTestAttr(component, "emailValidationError").text();
    expect(emailError).toBe("*Please Enter a valid Email");
  });

  it("gives error - when form is submitted without password", () => {
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });

    emailInput.simulate("change", {
      target: { value: "testEmailemail" },
    });

    passwordInput.simulate("change", {
      target: { value: "" },
    });

    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
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
    let firstNameInput = findByTestAttr(component, "firstNameInput");
    let lastNameInput = findByTestAttr(component, "lastNameInput");
    let emailInput = findByTestAttr(component, "emailInput");
    let passwordInput = findByTestAttr(component, "passwordInput");

    firstNameInput.simulate("change", {
      target: { value: "testFirstName" },
    });

    lastNameInput.simulate("change", {
      target: { value: "testLastName" },
    });

    emailInput.simulate("change", {
      target: { value: "testEmailemail" },
    });

    passwordInput.simulate("change", {
      target: { value: "test" },
    });

    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const form = findByTestAttr(component, "register");
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
