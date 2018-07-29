module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue-a11y/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
   // 'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'vue-a11y'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    //'generator-star-spacing': 'off',
    // allow debugger during development
    //'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}