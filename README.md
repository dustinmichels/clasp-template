# Clasp Starter Template

Starter template for [Google Apps Script](https://developers.google.com/apps-script/) projects using [clasp](https://github.com/google/clasp).

Includes some helper functions and polyfills that I frequently use.

## Setup

```bash
# Make sure clasp & typescript are installed globally
npm install -g typescript
npm install -g @google/clasp

# install GAS types locally
npm i -S @types/google-apps-script
```

Update `scriptId` in `.clasp.json`

## Push

```bash
clasp push
```
