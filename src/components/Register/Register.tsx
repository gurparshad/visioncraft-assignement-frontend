import React, { FormEvent, useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { authentication } from "../../App";

const Register: React.FC = () => {
  const history = useHistory();

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [registerError, setRegisterError] = useState<boolean>(false);

  const registerErrorMsg: string = "Email already in use, try login";

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid: boolean = false;
    isValid = validate(user);
    if (isValid) {
      console.log("inside the if isValid");
      await axios
        .post("http://localhost:3001/api/1.0/users/register", user)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          authentication.onAuthentication();
          history.push("/welcome");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setRegisterError(true);
          }
        });
    }
  };

  const validate = (user: User): boolean => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    setLastNameError("");
    setConfirmPasswordError("");

    // used regular expression for validation
    const emailRegex: RegExp = /\S+@\S+\.\S+/;
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

    let validationError: boolean = false;

    if (user.firstName === "") {
      setFirstNameError("*Please Enter the firstName");
      validationError = true;
    } else if (user.firstName.length < 3) {
      setFirstNameError("*firstName must be of atleast 3 characters");
      validationError = true;
    }

    if (user.lastName === "") {
      setLastNameError("*Please Enter the lastName");
      validationError = true;
    } else if (user.lastName.length < 3) {
      setLastNameError("*lastName must be of atleast 3 characters");
      validationError = true;
    }

    if (!user.email.match(emailRegex)) {
      setEmailError("*Please Enter a valid Email");
      validationError = true;
    }

    if (!user.password.match(passwordRegex)) {
      setPasswordError(
        "*Password must be of lenght 8 and contain atleast one uppercase, a lowercase and a number",
      );
      validationError = true;
    }

    if (user.password !== user.confirmPassword) {
      setConfirmPasswordError(
        "*Password and confirm password fields must be same",
      );
      validationError = true;
    }

    if (validationError === true) {
      console.log("here here", validationError);
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

        <div className="register__formGroup">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            value={user.confirmPassword}
          />
          <p className="register__error">{confirmPasswordError}</p>
        </div>
        {registerError && <p className="register__error">{registerErrorMsg}</p>}
        <input
          className="register__submitButton btn btn-primary"
          type="submit"
          value="Submit"
          data-test="submitInput"
        />
        <div>
          <p className="register__loginParagraph">
            Already have an account
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
