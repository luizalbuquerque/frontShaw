import React, { Component } from "react";
import GithubService from "../services/github";
import { Link } from "react-router-dom";

export default class UsersList extends Component {
  constructor() {
    super();
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.moveNext = this.moveNext.bind(this);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    GithubService.getAll(0)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  moveNext() {
    let since = this.state.users[this.state.users.length - 1].id;
    GithubService.getAll(since)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Users List</h4>

          <ul className="list-group">
            {users && users.map((user, index) => (
                <li className="list-group-item" key={index}>
                  <Link to={"/userdetails/" + user.login}>
                    {user.id} - {user.login}
                  </Link>
                </li>
              ))}
          </ul>

          <button className="m-3 btn btn-sm btn-info"
            onClick={this.moveNext}
          > 
          Next 
          </button>

        </div>
      </div>
    );
  }
}
