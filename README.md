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

### 3) Install packages

```sh
# Make sure clasp & typescript are installed globally
npm install -g typescript
npm install -g @google/clasp

# install GAS types locally
npm i -S @types/google-apps-script
```

For linting:

```sh
npm i --save-dev prettier @trivago/prettier-plugin-sort-imports
```

### 4) Setup Clasp

- `clasp login`
- Update `scriptId` in `.clasp.json` with an existing google script
