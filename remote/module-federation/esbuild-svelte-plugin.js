import * as fs from 'fs';
import * as path from 'path';
import * as svelteCompiler from 'svelte/compiler';

export const sveltePlugin = {
	name: 'svelte',
	setup(build) {
		build.onLoad({ filter: /\.svelte$/ }, async (args) => {
			// This converts a message in Svelte's format to esbuild's format
			let convertMessage = (source, filename, { message, start, end }) => {
				let location;
				if (start && end) {
					let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
					let lineEnd = start.line === end.line ? end.column : lineText.length;
					location = {
						file: filename,
						line: start.line,
						column: start.column,
						length: lineEnd - start.column,
						lineText,
					};
				}
				return { text: message, location };
			};

			// Load the file from the file system
			let source = await fs.promises.readFile(args.path, 'utf8');
			let filename = path.relative(process.cwd(), args.path);

			// Convert Svelte syntax to JavaScript (Svelte 5 compatible)
			try {
				let result = svelteCompiler.compile(source, { filename });
				let contents = result.js.code + `//# sourceMappingURL=` + result.js.map.toUrl();
				let warnings = (result.warnings || []).map((warning) => convertMessage(source, filename, warning));
				return { contents, warnings };
			} catch (e) {
				return { errors: [convertMessage(source, filename, e)] };
			}
		});
	},
};
