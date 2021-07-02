import rule from '@utils/validator-rule.js'

export let searchRules = {
  id: [
    rule('请输入正确的userID', 'id'),
  ],
}

export let formRules = {
  name: [
    rule.required('请输入user名称'),
  ],
}
