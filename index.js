import path from "path";
import { createFilter } from "@rollup/pluginutils";
import { validate } from "schema-utils";

const schema = {
  type: "object",
  properties: {
    memo: { type: "boolean" },
    autoBody: {
      anyOf: [
        {
          type: "object",
          properties: {
            formData: { type: "boolean" },
          },
          additionalProperties: false,
        },
        { type: "boolean" },
      ],
    },
    allowedContentTypes: {
      anyOf: [
        {
          type: "array",
          items: { type: "string" },
        },
        { enum: ["*"] },
      ],
    },
    sanitize: { type: "boolean" },
    disallowedTags: {
      type: "array",
      items: {
        enum: ["script", "style", "iframe"],
      },
    },
    include: {
      anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
    },
    exclude: {
      anyOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
    },
  },
  additionalProperties: false,
};

export default function hmplPlugin(userOptions = {}) {
  validate(schema, userOptions, {
    name: "hmpl-vite-plugin",
    baseDataPath: "options",
  });

  const {
    include = ["**/*.hmpl"],
    exclude = ["**/node_modules/**"],
    ...hmplOptions
  } = userOptions;

  const filter = createFilter(include, exclude);

  return {
    name: "vite:hmpl",
    enforce: "pre",

    transform(code, id) {
      if (!filter(id)) return;

      if (typeof code !== "string") {
        throw new Error("Input template must be a string");
      }

      const modulePath = path.posix.join("hmpl-js", "dist", "hmpl.runtime");
      const stringOptions = JSON.stringify(hmplOptions);
      const template = JSON.stringify(code);
      const transformedCode = `
        import * as hmpl from '${modulePath}';
        const template = hmpl.compile(${template}, ${stringOptions});
        export default template;
      `;

      return {
        code: transformedCode,
        map: null,
      };
    },
  };
}
