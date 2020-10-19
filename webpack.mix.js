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

mix.sass('resources/sass/application/app.scss', 'public/css')
    .webpackConfig({
        output: {
            filename: '[name].js',
            chunkFilename: 'js/[name].js',
        }
    })
    .js('resources/js/app.js', '')
    .copy('resources/js/framemanager.js', 'public/js')
    .sourceMaps()
    .extract(['vue', 'laravel-jetstream'])
    .version();