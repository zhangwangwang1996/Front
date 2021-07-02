import rule from '@utils/validator-rule.js'

export let searchRules = {
  id: [
    rule('请输入正确的imagBrowerID', 'id'),
  ],
}

export let formRules = {
  name: [
    rule.required('请输入imagBrower名称'),
  ],
}
