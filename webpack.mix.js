require('dotenv').config();
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.sourceMaps();

mix.webpackConfig(require('./webpack.config'));
mix.babelConfig({ presets: ['@vue/babel-preset-jsx'] })
mix.js('resources/js/app.js', 'public/js').vue();
mix.sass("resources/sass/application/app.scss", "public/css");
mix.extract(['vue', 'axios']);
mix.version();
