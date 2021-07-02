import rule from '@core/utils/validator-rule'

export default {
  data () {
    return {
      rules: {
        name: [
          rule.required('请输入名称'),
        ],
        price: [
          rule.required('请输入价格', 'number'),
          rule.required('请输入合法的价格', 'number', {
            min: 0.01,
            max: 99999999.99,
          }),
        ],
      },
    }
  },
}
