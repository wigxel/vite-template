import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";

export default defineConfig({
  base: {
    from: {
      relativePath: "./storage/app-base-openapi.json",
      source: "file",
    },
    outputDir: "./src/api/codegen",
    to: async (context) => {
      const filenamePrefix = "walletos";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      return await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
  liquidity: {
    from: {
      relativePath: "./storage/walletos-liquidity-openapi.json",
      source: "file",
    },
    outputDir: "./src/api/codegen",
    to: async (context) => {
      const filenamePrefix = "liquidity";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      return await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
