import React, { FormEvent, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const history = useHistory();

  interface User {
    email: string;
    password: string;
  }

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: boolean = validate(user);

    if (isValid) {
      try {
        console.log("inside try");
        axios
          .post("http://localhost:3001/api/1.0/users/login", user)
          .then((data) => {
            console.log("user is --->>", data);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            history.push("/welcome");
          });
      } catch (err) {
        console.log("error is -->>", err);
      }
    }
  };

  const validate = (user: User): boolean => {
    setEmailError("");
    setPasswordError("");
    setValidationError(false);

    // used regular expression for validation
    const emailRegex: RegExp = /\S+@\S+\.\S+/;
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

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
    <form onSubmit={submitHandler} className="login" data-test="login">
      <h2>Login Here</h2>
      <div className="login__formGroup">
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
      <div className="login__formGroup">
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
        className="login__submitButton btn btn-primary"
        type="submit"
        value="Login"
        data-test="submitInput"
      />
      <p className="register__loginPara">
        Don't have an account{" "}
        <span>
          <Link to="/">Register</Link>
        </span>
      </p>
    </form>
  );
};

export default Login;
