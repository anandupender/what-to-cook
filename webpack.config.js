const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './main.js',
    },
    resolve: {
      alias: {
         vue: 'vue/dist/vue.js'
      }
    }

    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js'
    //     },
    //     extensions: ['*', '.js', '.vue', '.json']
    // },
    // module: {
    //     rules: [
    //         {
    //             test: /\.vue$/,
    //             loader: 'vue-loader'
    //         }
    //     ]
    // }
};