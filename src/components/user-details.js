import React, { Component } from "react";
import GithubService from "../services/github";
import { Link } from "react-router-dom";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        login: "",
        html_url: "",
        created_at: ""
      },
      repositories: [],
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
    this.getRepositories(this.props.match.params.id);
  }

  getRepositories(id) {
    GithubService.getRepositories(id)
    .then(response => {
      this.setState({
        repositories: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  getUser(id) {
    GithubService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser, repositories } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <h4>User Details</h4>
            <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentUser.id}
                />
            </div>
            <div className="form-group">
                <label>Login</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUser.login}
                />
            </div>
            <div className="form-group">
                <label>Profile URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentUser.html_url}
                />
            </div>
            <div className="form-group">
                <label>Create at</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUser.created_at}
                />
            </div>

            <Link to={"/userslist/"}>
              Return
            </Link>
          </div>
          <div className="col-md-9">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {repositories && repositories.map((repository, index) => (
                  <tr key={index}>
                    <td>{repository.id}</td>
                    <td>{repository.name}</td>
                    <td>{repository.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
