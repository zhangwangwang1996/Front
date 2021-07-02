// 载入 views 目录下所有文件模块
const api = require('@utils/requires').requires(require.context('@views', true, /\.api\.js$/))

export default api
