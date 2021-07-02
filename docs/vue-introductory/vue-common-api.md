## Vue 常用API

> 完整内容请参阅：https://cn.vuejs.org/api/
>

```js
export default {
  // 组件名称
  name: 'ComponentName',
  // 子组件注册到当前组件
  components: {},
  // 自定义指令
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      },
    },
  },
  // 混合对象,可以包含任意组件选项
  mixins: [],
  // 依赖注入，对其其所有子孙后代注入一个依赖，该对象包含可注入其子孙的属性。
  provide: {},
  // 接收依赖注入的实例属性
  inject: [],
  // 单向传递父组件数据 可使用 sync 修饰符来改变传值
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0,
    },
  },
  // 实例的数据对象
  data () {
    return {}
  },
  // 计算属性将被混入到 Vue 实例中。
  computed: {},
  // 检测数据变化
  watch: {
    value: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 深度 watcher, 可用来检测数组/对象变化
    array: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true,
    },
  },
  created () { /* 在实例创建完成后被调用 */ },
  mounted () { /* 在挂载到实例上去之后被调用 */ },
  destroyed () { /* 实例销毁后调用 */ },
  // 混入到 Vue 实例中, 能直接同步调用
  methods: {},
  // 自定义过滤器
  filters: {},
}
```

