import React, { FormEvent, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate(user);

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

  const validate = (user: any) => {
    setEmailError("");
    setPasswordError("");
    setValidationError(false);
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;
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
    <form onSubmit={submitHandler} className="login">
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
        />
        <p className="register__error">{emailError}</p>
      </div>
      <div className="login__formGroup">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
        <p className="register__error">{passwordError}</p>
      </div>
      <input
        className="login__submitButton btn btn-primary"
        type="submit"
        value="Login"
      />
      <p className="register__loginPara">
        Don't have an account{" "}
        <span>
          <Link to="/">Register</Link>
        </span>
      </p>
    </form>
  );
}
