# Clasp Starter Template

Starter template for [Google Apps Script](https://developers.google.com/apps-script/) projects using [clasp](https://github.com/google/clasp).

Includes some helper functions for potential tasks.

## Setup

### 1) Clone Repo

```sh
https://github.com/dustinmichels/GAS-snippets.git
```

### 2) Init new project

```sh
# reset Git project
rm -rf .git
git init

# reset package.json
rm package.json package-lock.json
npm init -y
```

### 3) Install pacakges

```sh
# Make sure clasp & typescript are installed globally
npm install -g typescript
npm install -g @google/clasp

# install GAS types locally
npm i -S @types/google-apps-script
```

For [linting](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/):

```sh
# linter
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-tsdoc
```

### 4) Add lint script

In package.json, add:

```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
    "lintfix": "eslint . --ext .ts --fix",
  }
}
```

### 5) Setup Clasp

- `clasp login`
- Update `scriptId` in `.clasp.json` with an existing google script
