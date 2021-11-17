import { terser as pluginTerser } from "rollup-plugin-terser";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import { babel as pluginBabel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import * as path from "path";

import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const inputFileName = "src/js/app.js";

const banner = `
  /**
   * @license
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} License.
   */
`;

export default [
  {
    input: inputFileName,
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: "iife",
        sourcemap: "inline",
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace(".js", ".min.js"),
        format: "iife",
        sourcemap: "inline",
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginCommonjs({
        extensions: [".js"],
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, "babel.config.json"),
      }),
      pluginNodeResolve({
        browser: true,
      }),
      json({
        compact: true,
      }),
    ],
  },
  //
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginCommonjs({
        extensions: [".js"],
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, "babel.config.json"),
      }),
      pluginNodeResolve({
        browser: false,
      }),
      json({
        compact: true,
      }),
    ],
  },
  //
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: "inline",
        banner,
      },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
    plugins: [
      pluginCommonjs({
        extensions: [".js"],
      }),
      pluginBabel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, "babel.config.json"),
      }),
      pluginNodeResolve({
        browser: false,
      }),
      json({
        compact: true,
      }),
    ],
  },
];
