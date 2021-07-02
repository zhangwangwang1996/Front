/* global process */
let base = window._env_.VUE_APP_HOST
export const getImagBrowerTable = params => {
  return axios.post(`${base}/getImagBrowerTable`, params)
}
export const getImagBrowerDetail = params => {
  return axios.get(`${base}/getImagBrowerDetail/${params.id}`, {params})
}
export const exportImagBrowerData = params => {
  return axios.get(`${base}/exportImagBrowerData/${params.id}`, {params})
}
export const createImagBrowerData = params => {
  return axios.post(`${base}/createImagBrowerData`, params)
}
export const updateImagBrowerData = params => {
  return axios.post(`${base}/updateImagBrowerData/${params.id}`, params)
}
export const deleteImagBrowerData = params => {
  return axios.post(`${base}/deleteImagBrowerData/${params.id}`, params)
}
