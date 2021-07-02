/* global process */
let base = window._env_.VUE_APP_HOST
export const getViewNameTable = params => {
  return axios.post(`${base}/getViewNameTable`, params)
}
export const getViewNameDetail = params => {
  return axios.get(`${base}/getViewNameDetail/${params.id}`, {params})
}
export const exportViewNameData = params => {
  return axios.get(`${base}/exportViewNameData/${params.id}`, {params})
}
export const createViewNameData = params => {
  return axios.post(`${base}/createViewNameData`, params)
}
export const updateViewNameData = params => {
  return axios.post(`${base}/updateViewNameData/${params.id}`, params)
}
export const deleteViewNameData = params => {
  return axios.post(`${base}/deleteViewNameData/${params.id}`, params)
}
