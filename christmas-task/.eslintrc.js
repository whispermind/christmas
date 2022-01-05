module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier",
    "eslint:recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    project: './tsconfig.json',
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [0],
    "class-methods-use-this": [0],
    'max-len': ["error", { "code": 120 }]
  },
};
