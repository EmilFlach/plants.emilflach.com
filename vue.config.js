module.exports = {
    devServer: {
        watchOptions: {
            poll: true
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: "javascript/auto"
                }
            ]
        }
    },
};