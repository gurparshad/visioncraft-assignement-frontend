import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const history = useHistory();

  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="welcome" data-test="welcome">
      <h2>
        <span>Welcome to VisionCraft </span>
      </h2>
      <form onSubmit={handleLogout} data-test="welcomeForm">
        <input type="submit" value="logout" />
      </form>
    </div>
  );
}
