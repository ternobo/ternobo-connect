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

mix.options({
    hmrOptions: {
        host: '10.8.0.2',
        port: 8080
    }
});

mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
});

if (!mix.inProduction()) {
    mix.sourceMaps();
}

mix.webpackConfig(require('./webpack.config'));
mix.babelConfig({ presets: ['@vue/babel-preset-jsx'] })
mix.js('resources/js/app.js', 'public/js').vue({
    extractStyles: "public/css/components.css"
});

mix.sass("resources/sass/application/app.scss", "public/css");
mix.sass("resources/sass/application/app.ltr.scss", "public/css");

mix.extract(['vue', 'axios', "monaco-editor", "vuex", "bootstrap-vue", "laravel-echo"]);
mix.version();
