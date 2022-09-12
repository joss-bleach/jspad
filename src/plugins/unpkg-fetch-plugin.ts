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
      build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        const cachedResult =
          await packageBundleCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }

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
