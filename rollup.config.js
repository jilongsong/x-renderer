import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/components/x-renderer/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    'react/jsx-runtime',
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
      tsconfig: './tsconfig.json',
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
  ],
}; 