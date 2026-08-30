// NestJS depende de emitDecoratorMetadata, que o esbuild do Vitest não suporta —
// os testes compilam via SWC (receita oficial do Nest para Vitest).
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    passWithNoTests: true,
    hookTimeout: 30000,
    testTimeout: 30000,
  },
  plugins: [
    swc.vite({
      jsc: {
        target: "es2022",
        parser: { syntax: "typescript", decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
      module: { type: "es6" },
    }),
  ],
});
