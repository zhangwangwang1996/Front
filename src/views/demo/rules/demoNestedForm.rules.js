import rule from '@core/utils/validator-rule'

export default {
  data () {
    return {
      rules: {
        title: [
          rule.required('请输入标题'),
        ],
        goods: [
          rule.required('请输入列表', 'array'),
          {
            trigger: 'blur',
            message: '请正确填写列表',
            validator: (rule, value, callback) => {
              this.$refs.goods.validate().then(callback, callback)
            },
          }
        ],
      },
    }
  },
}
