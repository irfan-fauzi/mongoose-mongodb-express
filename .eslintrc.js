// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2015,
  },
  rules: {
    
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
}