<template>
  <el-select
    class="width-max"
    v-model="currentValue"
    filterable
    remote
    :multiple="multiple"
    :multiple-limit="multipleLimit"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
    @focus="focus"
    @change="change"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in items"
      :key="item[valueKey]"
      :label="getLabel(item)"
      :value="item[valueKey]">
      <slot v-bind:item="item">
        <span>{{item[labelKey]}}</span>
        <span class="info">/{{item[idKey]}}</span>
      </slot>
    </el-option>
  </el-select>
</template>

<script>
let timer = null
export default {
  name: 'RemoteSelect',
  props: {
    value: [String, Number, Array, Object],
    placeholder: {
      type: String,
      default: '请输入关键字',
    },
    multiple: Boolean,
    multipleLimit: Number,
    disabled: Boolean,
    clearable: Boolean,
    label: Function,
    valueKey: {
      type: String,
      default: 'id',
    },
    keywordKey: {
      type: String,
      default: 'keyword',
    },
    labelKey: {
      type: String,
      default: 'name',
    },
    idKey: {
      type: String,
      default: 'id',
    },
    queryRequest: Function,
    queryParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
    findRequest: Function,
    findParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    value () {
      !_.isEqual(this.value, this.currentValue) && this.setCurrentValue()
    },
  },
  data () {
    return {
      items: [],
      loading: false,
      currentValue: this.multiple ? [] : null,
    }
  },
  created () {
    this.value && this.setCurrentValue()
  },
  mounted () {},
  methods: {
    getLabel (item) {
      if (this.label) {
        return this.label(item)
      } else {
        return item[this.labelKey] + '/' + item[this.idKey]
      }
    },
    emptyOptions () {
      this.items = []
    },
    findOption (params) {
      return _.find(this.items, params)
    },
    setCurrentValue () {
      if (this.multiple) {
        this.currentValue = this.value || []
        this.currentValue.forEach((value) => {
          this.setOption(value)
        })
      } else {
        this.currentValue = this.value
        this.setOption(this.currentValue)
      }
    },
    setOption (value) {
      // 列表中不存在该列
      let params = {[this.valueKey]: value}
      if (this.findRequest && value && !this.findOption(params)) {
        this.findRequest({...params, ...this.findParams}).then(({data}) => {
          this.items.push(data)
          this.$emit('find-success', data)
        })
      }
    },
    setOptions (params = {}) {
      this.loading = true
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        this.queryRequest({...params, ...this.queryParams}).then(({data}) => {
          this.items = data.data
          this.$emit('query-success', data)
        }).finally(() => {
          this.loading = false
          clearTimeout(timer)
        })
      }, 500)
    },
    remoteMethod (keyword) {
      if (keyword !== '') {
        this.setOptions({[this.keywordKey]: keyword})
      } else {
        this.items = []
      }
    },
    change (value) {
      this.$emit('input', value)
      this.$emit('change', value ? this.findOption({[this.valueKey]: value, ...this.findParams}) : value)
    },
    focus () {
      if (!this.items.length) {
        this.setOptions()
      }
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
