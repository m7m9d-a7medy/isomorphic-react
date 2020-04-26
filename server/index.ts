import express from 'express'
import fs from 'fs-extra'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const port = process.env.PORT || 3000
const app = express()

if (process.env.NODE_ENV === 'development') {
    const config = require('../webpack.config.dev.babel')
    const options = {
        publicPath: '/',
        noInfo: true
    }

    const compiler = webpack(config)

    app.use(webpackDevMiddleware(compiler, options))
    app.use(webpackHotMiddleware(compiler))
}

app.get(['/'], async (req, res) => {
    let index = await fs.readFile('./public/index.html', 'utf-8')
    res.send(index)
})

app.listen(port as number, '0.0.0.0', () => console.info(`App is listening on ${port}`))