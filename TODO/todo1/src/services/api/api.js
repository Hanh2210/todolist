import axios from 'axios';
import {API_URL} from './config';

const setConfig = (method, url, params) => {
  let api =  API_URL + url;
    let headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    let data = params;
    return({ method, url:api, headers, data, } );
}

const get = (url, params) => {
  return(
    axios(setConfig('GET', url, params))
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return (error);
      })
  )
}

const post = (url, params) => {
  return (
    axios(setConfig('POST', url, params))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return (error);
    })
  )
}

const deleted = (url, params) => {
  return (
    axios(setConfig('DELETE', url, params))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return (error);
    })
  )
}

const update = (url, params) => {
  return (
    axios(setConfig('PATCH', url, params))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return (error);
    })
  )
}

// const register = (url, params) => {
//   return (
//     axios(setConfig('POST', url, params))
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       return (error);
//     })
//   )
// }

export default {get, post, deleted, update}