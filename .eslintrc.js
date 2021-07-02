// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    app: true,
    _: true,
    $: true,
    Vue: true,
    Vuex: true,
    Router: true,
    axios: true,
    request: true,
    ElementUI: true,
    filter: true,
    moment: true,
    eventBus: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // 要求箭头函数的参数使用圆括号 (arrow-parens)
    'arrow-parens': 0,
    // 强制 generator 函数中 * 号周围有空格 (generator-star-spacing)
    'generator-star-spacing': 0,
    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制一致使用反引号，双引号或单引号（引号）
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    // 不允许使用不必要的分号
    'no-extra-semi': 'error',
    // 允许多行式的末尾逗号
    'comma-dangle': ['error', 'only-multiline'],
    // 空行数限制
    'no-multiple-empty-lines': [1, {'max': 3}]
  }
}
