import { get, post, put, destroy } from "../../utlis/Api";

const Users = {
  index: () =>
    get('/users'),
  single: (id) =>
    get(`/users/${id}`),
  singleByEmail: (email) =>
    get(`/users?email=${email}`),
  create: (params) =>
    post('/users', params),
  update: (id, params) =>
    put(`/users/${id}`, params),
  remove: (id) =>
    destroy(`/users/${id}`),
}

const Auth = {
    login: (params) =>
      post('/auth/login', params),
    logout: (params) =>
      post('/auth/logout', params),
}

export { Auth, Users };