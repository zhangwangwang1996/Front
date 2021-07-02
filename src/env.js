/* global process */
if (!window._env_) {
  window._env_ = {}
}

for (let key in process.env) {
  if (process.env.hasOwnProperty(key) && /^VUE_APP_/.test(key)) {
    if (!window._env_.hasOwnProperty(key)) {
      window._env_[key] = process.env[key]
    }
  }
}

document.title = window._env_.VUE_APP_NAME
