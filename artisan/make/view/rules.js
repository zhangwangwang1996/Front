import rule from '@utils/validator-rule.js'

export let searchRules = {
  id: [
    rule('请输入正确的页面名称ID', 'id'),
  ],
}

export let formRules = {
  name: [
    rule.required('请输入页面名称名称'),
  ],
}
