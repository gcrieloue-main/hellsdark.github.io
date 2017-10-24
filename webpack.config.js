const path = require('path');

const config = {
    entry: {
        blog:  './blog.js',
        cv:  './cv.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};

module.exports = config;
