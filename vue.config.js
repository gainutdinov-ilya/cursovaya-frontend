module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://130.162.52.214:8080',
                ws: true,
                changeOrigin: true
            }
        }
    }
}
