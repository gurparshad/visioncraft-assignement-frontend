import React, { FormEvent, useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validate(user);
    if (isValid) {
      await axios
        .post("http://localhost:3001/api/1.0/users/register", user)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          history.push("/welcome");
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const validate = (user: any) => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    setLastNameError("");
    setValidationError(false);
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
    if (user.firstName === "") {
      setFirstNameError("*Please Enter the firstName");
      setValidationError(true);
    }
    if (user.lastName === "") {
      setLastNameError("*Please Enter the lastName");
      setValidationError(true);
    }
    if (!user.email.match(emailRegex)) {
      setEmailError("*Please Enter a valid Email");
      setValidationError(true);
    }
    if (!user.password.match(passwordRegex)) {
      setPasswordError(
        "*Password must be of lenght 8 and contain atleast one uppercase, a lowercase and a number",
      );
      setValidationError(true);
    }
    if (validationError === true) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form onSubmit={submitHandler} className="register" data-test="register">
      <div className="register__formInner">
        <h2>Register Here</h2>
        <div className="register__formGroup">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            value={user.firstName}
            autoComplete="true"
            data-test="firstNameInput"
          />
          <p className="register__error" data-test="firstNameValidationError">
            {firstNameError}
          </p>
        </div>
        <div className="register__formGroup">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            value={user.lastName}
            autoComplete="true"
            data-test="lastNameInput"
          />
          <p className="register__error" data-test="lastNameValidationError">
            {lastNameError}
          </p>
        </div>
        <div className="register__formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            autoComplete="true"
            data-test="emailInput"
          />
          <p className="register__error" data-test="emailValidationError">
            {emailError}
          </p>
        </div>
        <div className="register__formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            data-test="passwordInput"
          />
          <p className="register__error" data-test="passwordValidationError">
            {passwordError}
          </p>
        </div>
        <input
          className="register__submitButton btn btn-primary"
          type="submit"
          value="Submit"
          data-test="submitInput"
        />
        <div>
          <p className="register__loginParagraph">
            Already have an account{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
