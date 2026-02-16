// vite.config.ts
import { defineConfig } from "file:///root/app/code/remote/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///root/app/code/remote/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { federation } from "file:///root/app/code/remote/node_modules/@gioboa/vite-module-federation/lib/index.cjs";
import { createEsBuildAdapter } from "file:///root/app/code/remote/node_modules/@softarc/native-federation-esbuild/src/index.js";

// module-federation/esbuild-svelte-plugin.js
import * as fs from "fs";
import * as path from "path";
import * as svelteCompiler from "file:///root/app/code/remote/node_modules/svelte/src/compiler/index.js";
var sveltePlugin = {
  name: "svelte",
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async (args) => {
      let convertMessage = ({ message, start, end }) => {
        let location;
        if (start && end) {
          let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
          let lineEnd = start.line === end.line ? end.column : lineText.length;
          location = {
            file: filename,
            line: start.line,
            column: start.column,
            length: lineEnd - start.column,
            lineText
          };
        }
        return { text: message, location };
      };
      let source = await fs.promises.readFile(args.path, "utf8");
      let filename = path.relative(process.cwd(), args.path);
      try {
        let { js, warnings } = svelteCompiler.compile(source, { filename });
        let contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
        return { contents, warnings: warnings.map(convertMessage) };
      } catch (e) {
        return { errors: [convertMessage(e)] };
      }
    });
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/root/app/code/remote";
var vite_config_default = defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"]
    }
  },
  plugins: [
    // tsconfigPaths(),
    federation({
      options: {
        workspaceRoot: __vite_injected_original_dirname,
        outputPath: "dist",
        tsConfig: "tsconfig.json",
        federationConfig: "module-federation/federation.config.cjs",
        verbose: false,
        dev: command === "serve"
      },
      adapter: createEsBuildAdapter({
        plugins: [sveltePlugin]
      })
    }),
    svelte()
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibW9kdWxlLWZlZGVyYXRpb24vZXNidWlsZC1zdmVsdGUtcGx1Z2luLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYXBwL2NvZGUvcmVtb3RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9hcHAvY29kZS9yZW1vdGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYXBwL2NvZGUvcmVtb3RlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcbmltcG9ydCB7IGZlZGVyYXRpb24gfSBmcm9tICdAZ2lvYm9hL3ZpdGUtbW9kdWxlLWZlZGVyYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlRXNCdWlsZEFkYXB0ZXIgfSBmcm9tICdAc29mdGFyYy9uYXRpdmUtZmVkZXJhdGlvbi1lc2J1aWxkJztcbmltcG9ydCB7IHN2ZWx0ZVBsdWdpbiB9IGZyb20gJy4vbW9kdWxlLWZlZGVyYXRpb24vZXNidWlsZC1zdmVsdGUtcGx1Z2luJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICh7IGNvbW1hbmQgfSkgPT4gKHtcblx0c2VydmVyOiB7XG5cdFx0ZnM6IHtcblx0XHRcdGFsbG93OiBbJy4nLCAnLi4vc2hhcmVkJ10sXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdC8vIHRzY29uZmlnUGF0aHMoKSxcblx0XHRmZWRlcmF0aW9uKHtcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0d29ya3NwYWNlUm9vdDogX19kaXJuYW1lLFxuXHRcdFx0XHRvdXRwdXRQYXRoOiAnZGlzdCcsXG5cdFx0XHRcdHRzQ29uZmlnOiAndHNjb25maWcuanNvbicsXG5cdFx0XHRcdGZlZGVyYXRpb25Db25maWc6ICdtb2R1bGUtZmVkZXJhdGlvbi9mZWRlcmF0aW9uLmNvbmZpZy5janMnLFxuXHRcdFx0XHR2ZXJib3NlOiBmYWxzZSxcblx0XHRcdFx0ZGV2OiBjb21tYW5kID09PSAnc2VydmUnLFxuXHRcdFx0fSxcblx0XHRcdGFkYXB0ZXI6IGNyZWF0ZUVzQnVpbGRBZGFwdGVyKHtcblx0XHRcdFx0cGx1Z2luczogW3N2ZWx0ZVBsdWdpbl0sXG5cdFx0XHR9KSxcblx0XHR9KSxcblx0XHRzdmVsdGUoKSxcblx0XSxcbn0pKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYXBwL2NvZGUvcmVtb3RlL21vZHVsZS1mZWRlcmF0aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9hcHAvY29kZS9yZW1vdGUvbW9kdWxlLWZlZGVyYXRpb24vZXNidWlsZC1zdmVsdGUtcGx1Z2luLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L2FwcC9jb2RlL3JlbW90ZS9tb2R1bGUtZmVkZXJhdGlvbi9lc2J1aWxkLXN2ZWx0ZS1wbHVnaW4uanNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgc3ZlbHRlQ29tcGlsZXIgZnJvbSAnc3ZlbHRlL2NvbXBpbGVyJztcblxuZXhwb3J0IGNvbnN0IHN2ZWx0ZVBsdWdpbiA9IHtcblx0bmFtZTogJ3N2ZWx0ZScsXG5cdHNldHVwKGJ1aWxkKSB7XG5cdFx0YnVpbGQub25Mb2FkKHsgZmlsdGVyOiAvXFwuc3ZlbHRlJC8gfSwgYXN5bmMgKGFyZ3MpID0+IHtcblx0XHRcdC8vIFRoaXMgY29udmVydHMgYSBtZXNzYWdlIGluIFN2ZWx0ZSdzIGZvcm1hdCB0byBlc2J1aWxkJ3MgZm9ybWF0XG5cdFx0XHRsZXQgY29udmVydE1lc3NhZ2UgPSAoeyBtZXNzYWdlLCBzdGFydCwgZW5kIH0pID0+IHtcblx0XHRcdFx0bGV0IGxvY2F0aW9uO1xuXHRcdFx0XHRpZiAoc3RhcnQgJiYgZW5kKSB7XG5cdFx0XHRcdFx0bGV0IGxpbmVUZXh0ID0gc291cmNlLnNwbGl0KC9cXHJcXG58XFxyfFxcbi9nKVtzdGFydC5saW5lIC0gMV07XG5cdFx0XHRcdFx0bGV0IGxpbmVFbmQgPSBzdGFydC5saW5lID09PSBlbmQubGluZSA/IGVuZC5jb2x1bW4gOiBsaW5lVGV4dC5sZW5ndGg7XG5cdFx0XHRcdFx0bG9jYXRpb24gPSB7XG5cdFx0XHRcdFx0XHRmaWxlOiBmaWxlbmFtZSxcblx0XHRcdFx0XHRcdGxpbmU6IHN0YXJ0LmxpbmUsXG5cdFx0XHRcdFx0XHRjb2x1bW46IHN0YXJ0LmNvbHVtbixcblx0XHRcdFx0XHRcdGxlbmd0aDogbGluZUVuZCAtIHN0YXJ0LmNvbHVtbixcblx0XHRcdFx0XHRcdGxpbmVUZXh0LFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHsgdGV4dDogbWVzc2FnZSwgbG9jYXRpb24gfTtcblx0XHRcdH07XG5cblx0XHRcdC8vIExvYWQgdGhlIGZpbGUgZnJvbSB0aGUgZmlsZSBzeXN0ZW1cblx0XHRcdGxldCBzb3VyY2UgPSBhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShhcmdzLnBhdGgsICd1dGY4Jyk7XG5cdFx0XHRsZXQgZmlsZW5hbWUgPSBwYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIGFyZ3MucGF0aCk7XG5cblx0XHRcdC8vIENvbnZlcnQgU3ZlbHRlIHN5bnRheCB0byBKYXZhU2NyaXB0XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRsZXQgeyBqcywgd2FybmluZ3MgfSA9IHN2ZWx0ZUNvbXBpbGVyLmNvbXBpbGUoc291cmNlLCB7IGZpbGVuYW1lIH0pO1xuXHRcdFx0XHRsZXQgY29udGVudHMgPSBqcy5jb2RlICsgYC8vIyBzb3VyY2VNYXBwaW5nVVJMPWAgKyBqcy5tYXAudG9VcmwoKTtcblx0XHRcdFx0cmV0dXJuIHsgY29udGVudHMsIHdhcm5pbmdzOiB3YXJuaW5ncy5tYXAoY29udmVydE1lc3NhZ2UpIH07XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB7IGVycm9yczogW2NvbnZlcnRNZXNzYWdlKGUpXSB9O1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsNEJBQTRCOzs7QUNIc1IsWUFBWSxRQUFRO0FBQy9VLFlBQVksVUFBVTtBQUN0QixZQUFZLG9CQUFvQjtBQUV6QixJQUFNLGVBQWU7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixNQUFNLE9BQU87QUFDWixVQUFNLE9BQU8sRUFBRSxRQUFRLFlBQVksR0FBRyxPQUFPLFNBQVM7QUFFckQsVUFBSSxpQkFBaUIsQ0FBQyxFQUFFLFNBQVMsT0FBTyxJQUFJLE1BQU07QUFDakQsWUFBSTtBQUNKLFlBQUksU0FBUyxLQUFLO0FBQ2pCLGNBQUksV0FBVyxPQUFPLE1BQU0sYUFBYSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3pELGNBQUksVUFBVSxNQUFNLFNBQVMsSUFBSSxPQUFPLElBQUksU0FBUyxTQUFTO0FBQzlELHFCQUFXO0FBQUEsWUFDVixNQUFNO0FBQUEsWUFDTixNQUFNLE1BQU07QUFBQSxZQUNaLFFBQVEsTUFBTTtBQUFBLFlBQ2QsUUFBUSxVQUFVLE1BQU07QUFBQSxZQUN4QjtBQUFBLFVBQ0Q7QUFBQSxRQUNEO0FBQ0EsZUFBTyxFQUFFLE1BQU0sU0FBUyxTQUFTO0FBQUEsTUFDbEM7QUFHQSxVQUFJLFNBQVMsTUFBUyxZQUFTLFNBQVMsS0FBSyxNQUFNLE1BQU07QUFDekQsVUFBSSxXQUFnQixjQUFTLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSTtBQUdyRCxVQUFJO0FBQ0gsWUFBSSxFQUFFLElBQUksU0FBUyxJQUFtQix1QkFBUSxRQUFRLEVBQUUsU0FBUyxDQUFDO0FBQ2xFLFlBQUksV0FBVyxHQUFHLE9BQU8sMEJBQTBCLEdBQUcsSUFBSSxNQUFNO0FBQ2hFLGVBQU8sRUFBRSxVQUFVLFVBQVUsU0FBUyxJQUFJLGNBQWMsRUFBRTtBQUFBLE1BQzNELFNBQVMsR0FBRztBQUNYLGVBQU8sRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRTtBQUFBLE1BQ3RDO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUNEOzs7QUR2Q0EsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLE9BQU8sRUFBRSxRQUFRLE9BQU87QUFBQSxFQUNuRCxRQUFRO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDSCxPQUFPLENBQUMsS0FBSyxXQUFXO0FBQUEsSUFDekI7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVSLFdBQVc7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLFlBQVk7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULEtBQUssWUFBWTtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxTQUFTLHFCQUFxQjtBQUFBLFFBQzdCLFNBQVMsQ0FBQyxZQUFZO0FBQUEsTUFDdkIsQ0FBQztBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLEVBQ1I7QUFDRCxFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
