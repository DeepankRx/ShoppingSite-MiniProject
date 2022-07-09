import axios from "axios";

const responseBody = (response) => response;
const params = {
    withCredentials: true
}
const baseUrl = "http://localhost:5000/api";
const requests = {
  delete: (url, data) => axios.delete(`${url}`, { data },params).then(responseBody),
  get: (url, props) => axios.get(`${url}`, props,params).then(responseBody),
  put: (url, body) => axios.put(`${url}`, body ,params).then(responseBody),
  post: (url, body) => axios.post(`${url}`, body ,  params).then(responseBody)
};

const Auth = {
    login : (email, password) =>
        requests.post(baseUrl+'/auth/login', {email, password}),
    isLoggedIn : () =>
        requests.get(baseUrl+'/auth/isLoggedIn', params),

}

export default {Auth};