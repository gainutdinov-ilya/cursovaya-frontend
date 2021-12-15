module.exports = {
    devServer: {
        proxy: {
            '/V1': {
                target: 'http://localhost:80',
                changeOrigin: true,
                pathRewrite: {
                    '^/V1': ''
                }
            },
        }
    }
}
