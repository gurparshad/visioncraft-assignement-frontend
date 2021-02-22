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
  const [error, setError] = useState<string>("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: boolean = validate(user);
    if (isValid) {
      axios
        .post("http://localhost:3000/user/register", user)
        .then((data) => {
          console.log("user is --->>", data);
          history.push("/welcome");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            setEmailError("*The email already exists");
          } else {
            setError(
              "We can't serve your request at the moment. Please Try again later",
            );
          }
        });
    }
  };

  const validate = (user: any) => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (user.firstName == "") {
      setFirstNameError("*Please Enter the firstName");
      return false;
    } else if (!user.email.match(emailRegex)) {
      setEmailError("*Please Enter a valid Email");
      return false;
    } else if (!user.password.match(passwordRegex)) {
      setPasswordError(
        "*Password must be of lenght 8 and contain atleast one uppercase, a lowercase and a number",
      );
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={submitHandler} className="register">
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
          />
          <p className="register__error">{firstNameError}</p>
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
          />
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
          />
          <p className="register__error">{emailError}</p>
        </div>
        <div className="register__formGroup">
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
        {error === "" ? null : <p>{error}</p>}
        <input
          className="register__submitButton btn btn-primary"
          type="submit"
          value="Submit"
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
