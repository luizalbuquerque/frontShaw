import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserDetails from "./components/user-details";
import UsersList from "./components/users-list";

class App extends Component {
  render() {
    return (
      <div>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/userslist"]} component={UsersList} />
            <Route path="/userdetails/:id" component={UserDetails} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
