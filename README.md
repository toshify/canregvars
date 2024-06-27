# CanRegVars

Variable presentation case.

Data source (REST API):

- https://metadata.kreftregisteret.no/rest/v1/variables/:filtered
- https://metadata.kreftregisteret.no/rest/v1/variables/{id}

## Task

- "Query, browse and display" this data "in an organized way"
- "Allow to sort data at frontend"
- Export data in browser to client's file system
- Expect an internal CanReg user

## Run local

```sh
npm run dev

# or build version
npm run build & npm run preview
```

## Technology stack

Implementation in React + React Bootstrap + TypeScript + Vite & SWC + ESLint & Prettier.

### Going `prod`

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
