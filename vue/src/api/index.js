import axios from 'axios'

export default {
  get (url, params, headers) {
    let promise = axios.get(url, {params: params, headers: headers})
    return promise
  },
  post (url, params, headers, time = null) {
    let promise = axios.post(url, params, {headers: headers, timeout: time})
    return promise
  },
  delete (url, headers, time = null) {
    let promise = axios.delete(url, {headers: headers, timeout: time})
    return promise
  }
}
