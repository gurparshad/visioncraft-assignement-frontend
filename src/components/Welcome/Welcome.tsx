import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";

export default function Welcome() {
  const history = useHistory();

  const handleLogout = (e: FormEvent<HTMLFormElement>) => {
    console.log("inside handellogout");
    e.preventDefault();
    history.push("/");
  };

  return (
    <div>
      <h2>
        <span>Welcome Guru</span>
      </h2>
      <form onSubmit={handleLogout}>
        <input type="submit" value="logout" />
      </form>
    </div>
  );
}
