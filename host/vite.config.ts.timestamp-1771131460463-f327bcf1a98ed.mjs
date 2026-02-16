// vite.config.ts
import { defineConfig } from "file:///root/app/code/host/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///root/app/code/host/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { federation } from "file:///root/app/code/host/node_modules/@gioboa/vite-module-federation/lib/index.cjs";
import { createEsBuildAdapter } from "file:///root/app/code/host/node_modules/@softarc/native-federation-esbuild/src/index.js";

// module-federation/esbuild-svelte-plugin.js
import * as fs from "fs";
import * as path from "path";
import * as svelteCompiler from "file:///root/app/code/host/node_modules/svelte/src/compiler/index.js";
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
var __vite_injected_original_dirname = "/root/app/code/host";
var vite_config_default = defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"]
    }
  },
  plugins: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibW9kdWxlLWZlZGVyYXRpb24vZXNidWlsZC1zdmVsdGUtcGx1Z2luLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvYXBwL2NvZGUvaG9zdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvYXBwL2NvZGUvaG9zdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9hcHAvY29kZS9ob3N0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcbmltcG9ydCB7IGZlZGVyYXRpb24gfSBmcm9tICdAZ2lvYm9hL3ZpdGUtbW9kdWxlLWZlZGVyYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlRXNCdWlsZEFkYXB0ZXIgfSBmcm9tICdAc29mdGFyYy9uYXRpdmUtZmVkZXJhdGlvbi1lc2J1aWxkJztcbmltcG9ydCB7IHN2ZWx0ZVBsdWdpbiB9IGZyb20gJy4vbW9kdWxlLWZlZGVyYXRpb24vZXNidWlsZC1zdmVsdGUtcGx1Z2luJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICh7IGNvbW1hbmQgfSkgPT4gKHtcblx0c2VydmVyOiB7XG5cdFx0ZnM6IHtcblx0XHRcdGFsbG93OiBbJy4nLCAnLi4vc2hhcmVkJ10sXG5cdFx0fSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdGZlZGVyYXRpb24oe1xuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHR3b3Jrc3BhY2VSb290OiBfX2Rpcm5hbWUsXG5cdFx0XHRcdG91dHB1dFBhdGg6ICdkaXN0Jyxcblx0XHRcdFx0dHNDb25maWc6ICd0c2NvbmZpZy5qc29uJyxcblx0XHRcdFx0ZmVkZXJhdGlvbkNvbmZpZzogJ21vZHVsZS1mZWRlcmF0aW9uL2ZlZGVyYXRpb24uY29uZmlnLmNqcycsXG5cdFx0XHRcdHZlcmJvc2U6IGZhbHNlLFxuXHRcdFx0XHRkZXY6IGNvbW1hbmQgPT09ICdzZXJ2ZScsXG5cdFx0XHR9LFxuXHRcdFx0YWRhcHRlcjogY3JlYXRlRXNCdWlsZEFkYXB0ZXIoe1xuXHRcdFx0XHRwbHVnaW5zOiBbc3ZlbHRlUGx1Z2luXSxcblx0XHRcdH0pLFxuXHRcdH0pLFxuXHRcdHN2ZWx0ZSgpLFxuXHRdLFxufSkpO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9hcHAvY29kZS9ob3N0L21vZHVsZS1mZWRlcmF0aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9hcHAvY29kZS9ob3N0L21vZHVsZS1mZWRlcmF0aW9uL2VzYnVpbGQtc3ZlbHRlLXBsdWdpbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9hcHAvY29kZS9ob3N0L21vZHVsZS1mZWRlcmF0aW9uL2VzYnVpbGQtc3ZlbHRlLXBsdWdpbi5qc1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBzdmVsdGVDb21waWxlciBmcm9tICdzdmVsdGUvY29tcGlsZXInO1xuXG5leHBvcnQgY29uc3Qgc3ZlbHRlUGx1Z2luID0ge1xuXHRuYW1lOiAnc3ZlbHRlJyxcblx0c2V0dXAoYnVpbGQpIHtcblx0XHRidWlsZC5vbkxvYWQoeyBmaWx0ZXI6IC9cXC5zdmVsdGUkLyB9LCBhc3luYyAoYXJncykgPT4ge1xuXHRcdFx0Ly8gVGhpcyBjb252ZXJ0cyBhIG1lc3NhZ2UgaW4gU3ZlbHRlJ3MgZm9ybWF0IHRvIGVzYnVpbGQncyBmb3JtYXRcblx0XHRcdGxldCBjb252ZXJ0TWVzc2FnZSA9ICh7IG1lc3NhZ2UsIHN0YXJ0LCBlbmQgfSkgPT4ge1xuXHRcdFx0XHRsZXQgbG9jYXRpb247XG5cdFx0XHRcdGlmIChzdGFydCAmJiBlbmQpIHtcblx0XHRcdFx0XHRsZXQgbGluZVRleHQgPSBzb3VyY2Uuc3BsaXQoL1xcclxcbnxcXHJ8XFxuL2cpW3N0YXJ0LmxpbmUgLSAxXTtcblx0XHRcdFx0XHRsZXQgbGluZUVuZCA9IHN0YXJ0LmxpbmUgPT09IGVuZC5saW5lID8gZW5kLmNvbHVtbiA6IGxpbmVUZXh0Lmxlbmd0aDtcblx0XHRcdFx0XHRsb2NhdGlvbiA9IHtcblx0XHRcdFx0XHRcdGZpbGU6IGZpbGVuYW1lLFxuXHRcdFx0XHRcdFx0bGluZTogc3RhcnQubGluZSxcblx0XHRcdFx0XHRcdGNvbHVtbjogc3RhcnQuY29sdW1uLFxuXHRcdFx0XHRcdFx0bGVuZ3RoOiBsaW5lRW5kIC0gc3RhcnQuY29sdW1uLFxuXHRcdFx0XHRcdFx0bGluZVRleHQsXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4geyB0ZXh0OiBtZXNzYWdlLCBsb2NhdGlvbiB9O1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gTG9hZCB0aGUgZmlsZSBmcm9tIHRoZSBmaWxlIHN5c3RlbVxuXHRcdFx0bGV0IHNvdXJjZSA9IGF3YWl0IGZzLnByb21pc2VzLnJlYWRGaWxlKGFyZ3MucGF0aCwgJ3V0ZjgnKTtcblx0XHRcdGxldCBmaWxlbmFtZSA9IHBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgYXJncy5wYXRoKTtcblxuXHRcdFx0Ly8gQ29udmVydCBTdmVsdGUgc3ludGF4IHRvIEphdmFTY3JpcHRcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGxldCB7IGpzLCB3YXJuaW5ncyB9ID0gc3ZlbHRlQ29tcGlsZXIuY29tcGlsZShzb3VyY2UsIHsgZmlsZW5hbWUgfSk7XG5cdFx0XHRcdGxldCBjb250ZW50cyA9IGpzLmNvZGUgKyBgLy8jIHNvdXJjZU1hcHBpbmdVUkw9YCArIGpzLm1hcC50b1VybCgpO1xuXHRcdFx0XHRyZXR1cm4geyBjb250ZW50cywgd2FybmluZ3M6IHdhcm5pbmdzLm1hcChjb252ZXJ0TWVzc2FnZSkgfTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHsgZXJyb3JzOiBbY29udmVydE1lc3NhZ2UoZSldIH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTyxTQUFTLG9CQUFvQjtBQUN4USxTQUFTLGNBQWM7QUFDdkIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyw0QkFBNEI7OztBQ0hnUixZQUFZLFFBQVE7QUFDelUsWUFBWSxVQUFVO0FBQ3RCLFlBQVksb0JBQW9CO0FBRXpCLElBQU0sZUFBZTtBQUFBLEVBQzNCLE1BQU07QUFBQSxFQUNOLE1BQU0sT0FBTztBQUNaLFVBQU0sT0FBTyxFQUFFLFFBQVEsWUFBWSxHQUFHLE9BQU8sU0FBUztBQUVyRCxVQUFJLGlCQUFpQixDQUFDLEVBQUUsU0FBUyxPQUFPLElBQUksTUFBTTtBQUNqRCxZQUFJO0FBQ0osWUFBSSxTQUFTLEtBQUs7QUFDakIsY0FBSSxXQUFXLE9BQU8sTUFBTSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekQsY0FBSSxVQUFVLE1BQU0sU0FBUyxJQUFJLE9BQU8sSUFBSSxTQUFTLFNBQVM7QUFDOUQscUJBQVc7QUFBQSxZQUNWLE1BQU07QUFBQSxZQUNOLE1BQU0sTUFBTTtBQUFBLFlBQ1osUUFBUSxNQUFNO0FBQUEsWUFDZCxRQUFRLFVBQVUsTUFBTTtBQUFBLFlBQ3hCO0FBQUEsVUFDRDtBQUFBLFFBQ0Q7QUFDQSxlQUFPLEVBQUUsTUFBTSxTQUFTLFNBQVM7QUFBQSxNQUNsQztBQUdBLFVBQUksU0FBUyxNQUFTLFlBQVMsU0FBUyxLQUFLLE1BQU0sTUFBTTtBQUN6RCxVQUFJLFdBQWdCLGNBQVMsUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJO0FBR3JELFVBQUk7QUFDSCxZQUFJLEVBQUUsSUFBSSxTQUFTLElBQW1CLHVCQUFRLFFBQVEsRUFBRSxTQUFTLENBQUM7QUFDbEUsWUFBSSxXQUFXLEdBQUcsT0FBTywwQkFBMEIsR0FBRyxJQUFJLE1BQU07QUFDaEUsZUFBTyxFQUFFLFVBQVUsVUFBVSxTQUFTLElBQUksY0FBYyxFQUFFO0FBQUEsTUFDM0QsU0FBUyxHQUFHO0FBQ1gsZUFBTyxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFO0FBQUEsTUFDdEM7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNGO0FBQ0Q7OztBRHZDQSxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsT0FBTyxFQUFFLFFBQVEsT0FBTztBQUFBLEVBQ25ELFFBQVE7QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNILE9BQU8sQ0FBQyxLQUFLLFdBQVc7QUFBQSxJQUN6QjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLFdBQVc7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLFlBQVk7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULEtBQUssWUFBWTtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxTQUFTLHFCQUFxQjtBQUFBLFFBQzdCLFNBQVMsQ0FBQyxZQUFZO0FBQUEsTUFDdkIsQ0FBQztBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLEVBQ1I7QUFDRCxFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
