import rule from '@utils/validator-rule.js'

export let formPasswordRules = {
  oldPassword: [
    rule.required('请输入旧密码'),
  ],
  password: [
    rule.required('请输入新密码'),
  ],
  checkPassword: [
    rule.required('请确认新密码'),
  ],
}
