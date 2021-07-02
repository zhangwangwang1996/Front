let base = window._env_.VUE_APP_AUTH_HOST
let admin = window._env_.VUE_APP_HOST
export const login = params => {
  return axios.post(`${base}/login`, params)
}
export const getPermission = params => {
  return axios.get(`${admin}/permission`)
}
export const refreshToken = params => {
  return axios.post(`${base}/refresh`, params)
}
