const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}

var proxyMiddleware = require('http-proxy-middleware')
module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 3303,
        proxy: {
            '/': {
                target: 'http://193.112.58.152:3303',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
   
}



