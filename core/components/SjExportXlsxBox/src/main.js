import Vue from 'vue'
import mainVue from './main.vue'

const defaults = {
  type: 'auto', // auto object array
  total: 0,
  name: 'unnamed',
  header: null, // array
  // header: [{
  //   prop: '',
  //   label: '',
  // }],
  headerModel: {
    prop: 'prop',
    label: 'label',
  },
  data: [],
  request: null, // promise
  requestParams: {}, // object function
  responseData: (data) => data, // function
  currentPageField: 'current_page',
  perPageField: 'per_page',
  currentPage: 1,
  perPage: 50,
}

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
          if (prop === 'requestParams') {
            instance[prop] = filter.copyJson(options[prop])
          } else {
            instance[prop] = options[prop]
          }
        }
      }

      if (options.data.length) {
        return instance.download()
      }

      if (options.callback === undefined) {
        instance.callback = defaultCallback
      }

      let oldCb = instance.callback
      instance.callback = (action, instance) => {
        oldCb(action, instance)
      }

      if (!options.total.length) {
        instance.getTotal()
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
  if (options.callback && !callback) {
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

DemoDialogOnceBox.open = (name, data, options = {}) => {
  // 传入第二参数为 options 或 data
  if (Array.isArray(data)) {
    options.total = data.length
  } else {
    options = data
    data = []
  }
  return DemoDialogOnceBox(_.merge({
    name,
    data,
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
