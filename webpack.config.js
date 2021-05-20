const path = require('path');
const RTLCSSPlugin = require('rtlcss-webpack-mix-plugin');

module.exports = {
    plugins: [
        new RTLCSSPlugin({
            filename: '[name].ltr.css',
        })],
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        compress: true,

    },
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            'vue$': 'vue/dist/vue.js',
        },
    },
};
