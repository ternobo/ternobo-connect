const path = require('path');

module.exports = {
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
            'vue$': 'vue/dist/vue.js',
        },
    },
};
