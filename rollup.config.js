import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const production = !process.env.ROLLUP_WATCH;
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			dev,
			hydratable: true
			// emitCss: true
		}),
		postcss({extensions: [ '.css' ]}),
		resolve({
			browser: true,
			dedupe
		}),
		commonjs(),

		babel({
			extensions: [ '.js', '.mjs', '.html', '.svelte' ],
			runtimeHelpers: true,
			exclude: [ 'node_modules/@babel/**' ],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, not dead, ie 11',
						useBuiltIns: 'usage',
						corejs: 3
					}
				]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				[
					'@babel/plugin-transform-runtime',
					{
						useESModules: true
					}
				]
			]
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
