import Vue from 'vue'
import mainVue from './main.vue'

const defaults = {}

const MainConstructor = Vue.extend(mainVue)

let currentBox, instance
let queues = []

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

const showNextQueue = () => {
  if (!instance) {
    initInstance()
  }

  instance.action = ''

  if (!instance.visible || instance.closeTimer) {
    if (queues.length > 0) {
      currentBox = queues.shift()

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
        showNextQueue()
      }

      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

const DemoDialogBox = function (options, callback) {
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
      queues.push({
        options: _.merge({}, defaults, DemoDialogBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject,
      })

      showNextQueue()
    })
  } else {
    queues.push({
      options: _.merge({}, defaults, DemoDialogBox.defaults, options),
      callback: callback,
    })

    showNextQueue()
  }
}

DemoDialogBox.setDefaults = defaults => {
  DemoDialogBox.defaults = defaults
}

DemoDialogBox.open = (message, title, options = {}) => {
  return DemoDialogBox(_.merge({
    title: title,
    message: message,
  }, options))
}

DemoDialogBox.close = () => {
  instance.doClose()
  instance.visible = false
  queues = []
  currentBox = null
}

DemoDialogBox.destroy = () => {
  if (instance) {
    instance.$el.remove()
    instance.$destroy()
    instance = null
  }
}

export default DemoDialogBox
export { DemoDialogBox }
