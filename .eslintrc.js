module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020, // Version that allows dynamic imports
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // we don't care that .js files contain JSX code
    'react/jsx-props-no-spreading': 'off', // HOCs should have prop spreading
    'react-hooks/rules-of-hooks': 'error', // part of react hooks
    /* We want to remove this so we don't have infinite read requests from Airtable */
    // 'react-hooks/exhaustive-deps': 'warn', // part of react hooks
    'linebreak-style': 0,
  },
  settings: { // To fix import no-unresolved error on Windows
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
