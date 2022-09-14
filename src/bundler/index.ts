import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { unpkgFetchPlugin } from "./plugins/unpkg-fetch-plugin";

let service: esbuild.Service;

const bundle = async (inputCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    const bundledCode = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin(inputCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    return {
      code: bundledCode.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default bundle;
