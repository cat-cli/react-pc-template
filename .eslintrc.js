module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'no-console': 2,
    semi: ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    eqeqeq: ['error', 'always'],
    'no-extra-semi': 'error',
    'explicit-function-return-type': 0,
    camelcase: 0,
    "react-hooks/exhaustive-deps":0,
  },
};
