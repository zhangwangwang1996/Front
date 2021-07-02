/* global process */
let base = window._env_.VUE_APP_HOST
export const getUserTable = params => {
  return axios.post(`${base}/getUserTable`, params)
}
export const getUserDetail = params => {
  return axios.get(`${base}/getUserDetail/${params.id}`, {params})
}
export const exportUserData = params => {
  return axios.get(`${base}/exportUserData/${params.id}`, {params})
}
export const createUserData = params => {
  return axios.post(`${base}/createUserData`, params)
}
export const updateUserData = params => {
  return axios.post(`${base}/updateUserData/${params.id}`, params)
}
export const deleteUserData = params => {
  return axios.post(`${base}/deleteUserData/${params.id}`, params)
}
