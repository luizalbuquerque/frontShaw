import http from "../http-common";

class GithubService {
  getAll(since) {
    return http.get(`/users?since=${since}&per_page=10`);
  }

  get(username) {
    return http.get(`/users/${username}`);
  }

  getRepositories(username) {
    return http.get(`/users/${username}/repos`);
  }
}

export default new GithubService();