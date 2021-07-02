## Vuex 储存状态管理器

> 文档：https://vuex.vuejs.org/zh/guide/

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

#### 核心概念

- State(mapState({})) 单一状态树, 用一个对象就包含了全部的应用层级状态。
- Getter(mapGetters([])) 计算属性, 返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- Mutation(mapMutations([])) 更改 Vuex 的 store 中的状态的唯一方法是提交。必须是同步函数。
- Action(mapActions([])) 提交的是 mutation，而不是直接变更状态。可以包含任意异步操作。返回的是一个`Promise`对象
- Module 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。


auth模块的store示例
```js
// initial state
const state = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
}

// getters
const getters = {
    user: state => state.user,
}

// actions
const actions = {
  getMe ({commit, state}) {
    return request.dispatch('getMe').then((res) => {
      commit('SET_USER', res.data)
      return res
    })
  },
}

// mutations
const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
}

export const auth = {
  state,
  getters,
  actions,
  mutations,
}
```

auth模块store的使用
```js
{
  computed: {
    ...Vuex.mapState({
      user: state => state.auth.user
    })
    //...Vuex.mapGetters([
    //  'user',
    //]),
  },
  created () {
    this.getMe().then().catch()
    // this.$store.dispatch('getMe')
  },
  methods: {
    ...Vuex.mapActions(['getMe']),
  },
}
```