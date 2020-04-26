import webpack from 'webpack'
import path from 'path'

module.exports = {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'src/')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'development',
                WEBPACK: true
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    }
}