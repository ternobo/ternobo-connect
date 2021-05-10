const path = require('path');

module.exports = {
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
