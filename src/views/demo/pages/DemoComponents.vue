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
      <template slot="header">Dialog 组件</template>
      <el-button type="primary"
                 @click="visibleDialog=true">visibleDialog
      </el-button>
      <el-button type="primary"
                 @click="visibleToBody=true">visibleToBody
      </el-button>
      <el-button type="primary"
                 @click="openDialogBox">openDialogBox
      </el-button>
      <el-button type="primary"
                 @click="openDialogOnceBox">openDialogOnceBox
      </el-button>
      <hr/>
      <el-button type="primary"
                 @click="visibleFormDialog=true">visibleFormDialog
      </el-button>
      <el-button type="primary"
                 @click="visibleTableDialog=true">visibleTableDialog
      </el-button>
    </sj-panel>

    <sj-panel>
      <template slot="header">组件依赖注入的内容</template>
      <el-input v-model="message"/>
      <provide-div :message="message">
        <inject-div></inject-div>
      </provide-div>
    </sj-panel>

    <sj-panel>
      <template slot="header">custom-v-model</template>
      <custom-v-model v-model="array"/>
      <p><b>custom-v-model:</b></p>
      <p v-for="(value, index) in array">array[{{index}}] {{value}}</p>
    </sj-panel>

    <sj-panel>
      <template slot="header">私有的自定义组件</template>
      <el-input v-model="privateDivMessage"/>
      <private-div ref="privateDiv"></private-div>
      <p>这是页面访问的PrivateDiv组件的值：<b>{{privateDivMessage}}</b></p>
    </sj-panel>

    <sj-panel>
      <template slot="header">组件属性的继承</template>
      <inherit-attrs round>该组件使用属性继承的方式调用了
        <el-tag type="info">&lt;el-button&gt;</el-tag>
      </inherit-attrs>
    </sj-panel>

    <sj-panel>
      <template slot="header">el-scrollbar</template>
      <el-scrollbar
        wrap-style="overflow-x: hidden;"
        style="height: 100px">
        <pre>
  &lt;el-scrollbar
    wrap-style=&quot;overflow-x: hidden;&quot;
    style=&quot;height: 100px&quot;&gt;
      我是内容
  &lt;/el-scrollbar&gt;
        </pre>
      </el-scrollbar>
    </sj-panel>

    <demo-dialog :visible.sync="visibleDialog"/>
    <demo-form-dialog :visible.sync="visibleFormDialog"/>
    <demo-to-body :visible="visibleToBody"/>
    <demo-table-dialog :visible.sync="visibleTableDialog"></demo-table-dialog>
  </div>
</template>

<script>
import DemoDialog from '../components/DemoDialog'
import DemoFormDialog from '../components/DemoFormDialog'
import DemoToBody from '../components/DemoToBody'
import DemoDialogBox from '../components/demo-dialog-box'
import DemoDialogOnceBox from '../components/demo-dialog-once-box'
import ProvideDiv from '../components/provide-div/src/ProvideDiv'
import InjectDiv from '../components/provide-div/src/InjectDiv'
import CustomVModel from '../components/CustomVModel'
import PrivateDiv from '../components/private-div/src/PrivateDiv'
import InheritAttrs from '../components/InheritAttrs'
import DemoTableDialog from '@views/demo/components/DemoTableDialog'

export default {
  components: {
    DemoTableDialog,
    InheritAttrs,
    PrivateDiv,
    CustomVModel,
    InjectDiv,
    ProvideDiv,
    DemoToBody,
    DemoDialog,
    DemoFormDialog
  },
  mixins: [],
  data () {
    return {
      visibleDialog: false,
      visibleToBody: false,
      visibleFormDialog: false,
      visibleTableDialog: false,
      message: '依赖注入的内容',
      array: [],
      privateDivMessage: '',
    }
  },
  computed: {
    ...Vuex.mapState({}),
  },
  watch: {
    privateDivMessage: function (val) {
      this.$refs.privateDiv.message = val
    },
  },
  created () {},
  mounted () {
    this.privateDivMessage = this.$refs.privateDiv.message
  },
  destroyed () {
    // 离开页面时销毁这个弹窗组件
    DemoDialogBox.destroy()
  },
  methods: {
    openDialogBox () {
      let open = (message) => {
        DemoDialogBox.open(message, '标题').then(() => {
          this.$message.info('点击了确认')
        }).catch(() => {
          this.$message.warning('点击了取消')
        })
      }
      open('这是第一条消息')
      this.$nextTick(() => {
        open('这是第二条消息')
      })
    },
    openDialogOnceBox () {
      let open = (message) => {
        let promise = DemoDialogOnceBox.open(message, '标题')
        return promise.then(() => {
          this.$message.info('点击了确认')
        }).catch((error) => {
          this.$message.warning('点击了取消')
          promise.reject(error)
        })
      }
      open('这是第一条消息，没有自动队列，需要在当前模态框关闭后才能手动打开第二个窗口。').then(() => {
        open('这是第二条消息，没有自动队列，需要在当前模态框关闭后才能手动打开第二个窗口。')
      })
    },
  },
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
