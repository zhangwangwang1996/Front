/* global process */
let base = window._env_.VUE_APP_HOST
export const getDemoTable = params => {
  return axios.post(`${base}/getDemoTable`, params)
}
export const getDemoDetail = params => {
  return axios.get(`${base}/getDemoDetail/${params.id}`, {params})
}
export const exportDemoData = params => {
  return axios.get(`${base}/exportDemoData/${params.id}`, {params})
}
export const createDemoData = params => {
  return axios.post(`${base}/createDemoData`, params)
}
export const updateDemoData = params => {
  return axios.post(`${base}/updateDemoData/${params.id}`, params)
}
export const deleteDemoData = params => {
  return axios.post(`${base}/deleteDemoData/${params.id}`, params)
}
export const deleteMultipleDemoData = params => {
  return axios.post(`${base}/deleteMultipleDemoData`, params)
}
export const uploadDemoImage = params => {
  return axios.post(`${base}/uploadDemoImage`, params)
}
