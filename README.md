# vite-plugin-hmpl

[![npm-version](https://img.shields.io/npm/v/vite-plugin-hmpl?logo=npm&color=fff)](https://www.npmjs.com/package/vite-plugin-hmpl)

This Vite plugin is designed for compiling files with the `.hmpl` extension using the [hmpl-js](https://www.npmjs.com/package/hmpl-js) package. It allows you to use HMPL templates directly in your Vite-powered projects.

> The plugin works with `hmpl-js` version 1.0.4 or higher.

## Installation

```bash
npm install --save-dev vite-plugin-hmpl
```

## Usage

In your `vite.config.js` file, add the following configuration:

```javascript
import { defineConfig } from "vite";
import hmplPlugin from "vite-plugin-hmpl";

export default defineConfig({
  plugins: [
    hmplPlugin({
      memo: true,
      sanitize: true,
    }),
  ],
});
```

### Example

With this plugin, you can import `.hmpl` files as templates in your JavaScript code.

#### template.hmpl

```html
<div>{{#request src="/api/test"}} {{/request}}</div>
```

#### main.js

```javascript
import templateFn from "./template.hmpl";

const elementObj = templateFn();
```

## Plugin Options

The plugin supports various configuration options. Here are the most commonly used ones:

```javascript
hmplPlugin({
  memo: true,
  sanitize: true,
  autoBody: { formData: true },
  allowedContentTypes: ["text/html"],
  disallowedTags: ["script", "style"],
  include: ["src/templates/**/*.hmpl"], // Glob pattern to include specific files
  exclude: ["**/*.test.hmpl"], // Glob pattern to exclude specific files
});
```

### Option Descriptions:

- **include**: (string or array of strings) Glob pattern to specify which files to include. Defaults to `**/*.hmpl`.
- **exclude**: (string or array of strings) Glob pattern to specify which files to exclude. Defaults to `**/node_modules/**`.

The full list of options is described in the [HMPL language specification](https://spec.hmpl-lang.dev/#options).

## Changelog

You can view the changelog for this plugin on the [GitHub releases page](https://github.com/hmpl-language/vite-plugin-hmpl/releases).

## License

This project is licensed under the [MIT License](https://github.com/hmpl-language/vite-plugin-hmpl/blob/main/LICENSE).
