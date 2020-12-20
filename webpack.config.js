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
    },
    watch:true
};