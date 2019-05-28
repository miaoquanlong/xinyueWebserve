const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://193.112.58.152:3303',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': ''
                }
            }
        }
    },

}



