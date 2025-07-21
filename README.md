# 프로젝트 세팅

- public/index.html 정리
- package.json 정리
- index.js 정리
- App.js 정리
- index.css 정리
- App.css 제거
- css 폴더 생성/layout.css 생성
- npm 관련 제거(test 등등)

# 기본 ESLint, Prettier 설정

## 1. ESLint

```bash
npm install eslint@latest -D
```

```bash
npm install eslint-config-react-app --save-dev --force
```

- 지금은 최신 버전 mjs로 진행함.

```bash
npx eslint --init
```

## 2. prettier

```bash
npm i prettier -D
```

- .prettierrc.json 파일 생성

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

## 3. ESLint 와 prettier 연결

```bash
npm i  eslint-config-prettier -D
npm i  eslint-plugin-prettier -D
```

- `eslint.config.mjs` 설정 수정

```mjs
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "prettier/prettier": "warn",
      "no-var": "warn",
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
```

- VSCode의 settings.json에 내용 추가(`Ctrl + ,`)

```json
  "eslint.useFlatConfig": true
```

## 4. 기본 npm 설치하기

- emotion 설치

```bash
npm i @emotion/react
npm i @emotion/styled
```

- scss 설치

```bash
npm i sass
```

- react-router-dom 설치

```bash
npm i react-router-dom
```

## 5. react-router-dom 의 라우터 세팅

- App.jsx에 작성 (Router > Routes > Route)
