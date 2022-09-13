import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const packageBundleCache = localForage.createInstance({
  name: "packageBundleCache",
});

export const unpkgFetchPlugin = (inputCode: string) => {
  return {
    name: "unpkg-fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index.js/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult =
          await packageBundleCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escapedCSS = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escapedCSS}';
          document.head.appendChild(style);`;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await packageBundleCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await packageBundleCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
