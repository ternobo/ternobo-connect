const path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].js',
    },
    devServer: {
        port: 9000,
    }
    // resolve: {
    //     alias: {
    //         '@': path.resolve('resources/js'),
    //         'vue$': 'vue/dist/vue.runtime.common.js',
    //     },
    // },
};
