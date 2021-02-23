import React from "react";
import "./App.css";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome/Welcome";

interface Auth {
  isLoggedIn: boolean;
  onAuthentication(): void;
  getLogInStatus(): boolean;
}

export const authentication: Auth = {
  isLoggedIn: false,

  onAuthentication(): void {
    this.isLoggedIn = true;
  },

  getLogInStatus(): boolean {
    return this.isLoggedIn;
  },
};

export const SecuredRoute = (props: any) => {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <SecuredRoute path="/welcome" component={Welcome}></SecuredRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
