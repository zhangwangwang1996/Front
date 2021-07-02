import Vue from 'vue'
import mainVue from './main.vue'

const defaults = {}

const MainConstructor = Vue.extend(mainVue)

let instance, currentBox

const defaultCallback = action => {
  if (currentBox) {
    let callback = currentBox.callback
    if (typeof callback === 'function') {
      callback(action)
    }
    if (currentBox.resolve) {
      if (action === 'confirm') {
        currentBox.resolve(action)
      } else if (currentBox.reject && (action === 'cancel' || action === 'close')) {
        currentBox.reject(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new MainConstructor({
    el: document.createElement('div'),
  })

  instance.callback = defaultCallback
}

const showBox = () => {
  if (!instance) {
    initInstance()
  }

  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (currentBox) {
      let options = currentBox.options
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }

      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }

      let oldCb = instance.callback
      instance.callback = (action, instance) => {
        oldCb(action, instance)
      }

      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const DemoDialogOnceBox = function (options, callback) {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string') {
    options = {
      message: options,
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      currentBox = {
        options: _.merge({}, defaults, DemoDialogOnceBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject,
      }

      showBox()
    })
  } else {
    currentBox = {
      options: _.merge({}, defaults, DemoDialogOnceBox.defaults, options),
      callback: callback,
    }

    showBox()
  }
}

DemoDialogOnceBox.setDefaults = defaults => {
  DemoDialogOnceBox.defaults = defaults
}

DemoDialogOnceBox.open = (message, title, options = {}) => {
  return DemoDialogOnceBox(_.merge({
    title: title,
    message: message,
  }, options))
}

DemoDialogOnceBox.close = () => {
  instance.doClose()
  instance.visible = false
  currentBox = null
}

DemoDialogOnceBox.destroy = () => {
  if (instance) {
    instance.$el.remove()
    instance.$destroy()
    instance = null
  }
}

export default DemoDialogOnceBox
export { DemoDialogOnceBox }
