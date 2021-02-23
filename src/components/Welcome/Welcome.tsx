import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const history = useHistory();

  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="welcome">
      <h2>
        <span>Hello </span>
      </h2>
      <form onSubmit={handleLogout}>
        <input type="submit" value="logout" />
      </form>
    </div>
  );
}
