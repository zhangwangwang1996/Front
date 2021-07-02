<template>
  <div v-title="$route.meta.title">
    <div class="page-heading">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>DEMO管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <sj-panel>
      <template slot="header">键盘快捷键监听</template>
      <h3>
        mousetrap 文档参考: <a href="https://craig.is/killing/mice">https://craig.is/killing/mice</a>
      </h3>
      <h3>
        github: <a href="https://github.com/ccampbell/mousetrap">https://github.com/ccampbell/mousetrap</a>
      </h3>
      <p>
        对于组合键就可以使用shift，ctrl，alt，或meta。
      </p>
      <p>
        您也可以替换option为alt与command对meta。
      </p>
      <p>
        其他特殊键backspace，tab，enter，return，capslock，esc，escape，space，pageup，pagedown，end，home，left，up，right，down，ins，del，和plus。
      </p>
      <p>
        任何其他键，你应该能够像名字来引用a，/，$，*，或=。
      </p>

      <hr>

      <p>
        在Mac上，这最终映射到command+s在Windows和Linux上映射到ctrl+s
      </p>
      <p>
        监听键盘输入 ?， 它自动处理了 shift 按键
      </p>
      <p>
        当前监听了{{bind.join('、')}}，已按下：
      </p>
      <el-tag>{{key}}</el-tag>
    </sj-panel>

  </div>
</template>

<script>
import Mousetrap from 'mousetrap'

const mousetrap = Mousetrap

export default {
  components: {},
  mixins: [],
  data () {
    return {
      key: '未按下监听的键',
      bind: ['?', 'space', 'mod+s'],
    }
  },
  computed: {},
  watch: {},
  created () {
    for (let key of this.bind) {
      mousetrap.bind(key, (e) => {
        this.key = key
        return false
      })
    }
    mousetrap.bind('', (e) => {
      return false
    })
    mousetrap.bind(['?', 'space', 'mod'], (e) => {
      this.key = '未按下监听的键'
      return false
    }, 'keyup')
  },
  mounted () {},
  destroyed () {
    mousetrap.reset()
  },
  methods: {},
}
</script>
<style lang="scss">
// 全局CSS
</style>
<style lang="scss"
       scoped>
// 带作用域的CSS
// https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html
</style>
<style lang="scss"
       module>
// 带作用域的CSS
// 绑定class方式 <p :class="$style.red"></p>
// https://vue-loader.vuejs.org/zh-cn/features/css-modules.html
</style>
