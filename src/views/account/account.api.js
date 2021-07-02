/* global process */
let base = window._env_.VUE_APP_HOST
export const getAccountDetail = params => {
  return axios.get(`${base}/getAccountDetail`, {params})
}
export const updateAccountPassword = params => {
  return axios.post(`${base}/updateAccountPassword`, params)
}
