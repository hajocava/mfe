const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:8081';

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, prodConfig);