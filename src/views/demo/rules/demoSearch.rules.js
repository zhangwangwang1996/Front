import rule from '@core/utils/validator-rule'

export default {
  data () {
    return {
      rules: {
        min: [
          rule('最小值为0', 'integer', {
            min: 0,
          }),
        ],
        phone: [
          rule('请输入手机号'),
          rule('请输入正确的手机号', 'phone'),
        ],
      },
    }
  }
}
