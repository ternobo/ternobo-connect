const mix = require('laravel-mix');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    plugins: [
        new MonacoWebpackPlugin()],
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    watchOptions: {
        ignored: ["/node_modules/", "/public"],
        aggregateTimeout: 300,
        poll: 1000
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        compress: true,

    },
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            'vue$': mix.inProduction() ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
        },
    },
};
