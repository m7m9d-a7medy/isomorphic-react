import React from 'react'
import { renderToString } from 'react-dom/server'
import {Provider} from 'react-redux'
import App from '../src/App'
import getStore from '../src/getStore'

import { StackoverflowResponse } from './../data/types';
import express from 'express'
import fs from 'fs-extra'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import minimist from 'minimist'
import { get } from 'request-promise'
import { question, questions } from '../data/api-real-urls'
import { delay } from 'redux-saga/effects'
import { Question } from '../data/types'

const argv = minimist(process.argv.slice(2))
const port = process.env.PORT || 3000
const app = express()

const useLiveData = argv.useLiveData === true
const useServerRender = argv.useServerRender === true

const getQuestions = async (): Promise<StackoverflowResponse> => {
    let data
    if (useLiveData) {
        data = (await get(questions, { gzip: true })) as string
        console.log('used live')
    } else {
        data = (await fs.readFile('./data/mock-questions.json')) as any as string
        console.log('used mock')
    }
    return JSON.parse(data)
}

const getQuestion = async (id: number): Promise<StackoverflowResponse> => {
    let data
    if (useLiveData) {
        data = (await get(question(id), { gzip: true, json: true })) as string
        console.log('used live')
        return JSON.parse(data) as StackoverflowResponse
    } else {
        const questions = await getQuestions()
        const question = questions.items.find(_q => _q.question_id == id)
        if (question) {
            question.body = `Mock question ${id}`
            data = {
                ...questions,
                items: [question]
            }
            return data
        } else {
            return questions
        }
    }
}

app.get('/api/questions', async (req, res) => {
    const data = await getQuestions()
    await delay(1000)
    res.json(data)
})

app.get('/api/questions/:id', async (req, res) => {
    console.log(req.params)
    const data = await getQuestion(req.params.id as any as number)
    await delay(1000)
    res.json(data)
})

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
    const initialState: { questions: Array<Question> } = {
        questions: []
    }

    const questions = await getQuestions()
    initialState.questions = questions.items
    const store = getStore(initialState)

    if (useServerRender) {
        const renderedApp = renderToString((
            <Provider store={store}>
                <App />
            </Provider>
        ))
        index = index.replace(`<%= preloadedApplication %>`, renderedApp)
    } else {
        index = index.replace(`<%= preloadedApplication %>`, `Please wait till we load the application`)
    }
    res.send(index)
})

app.listen(port as number, '0.0.0.0', () => console.info(`App is listening on ${port}`))