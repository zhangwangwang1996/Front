import rule from '@core/utils/validator-rule'

export default {
  data () {
    return {
      rules: {
        name: [
          rule.required('请输入名称'),
        ],
        phone: [
          rule.required('请输入手机号', 'phone'),
        ],
        email: [
          rule.required('请输入邮箱', 'email'),
        ],
      },
    }
  },
}
