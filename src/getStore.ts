import { createStore, combineReducers, applyMiddleware, StoreEnhancer } from 'redux'
import { identity } from 'lodash'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import fetchQuesionsSaga from './sagas/fetch-questions.saga'
import * as reducers from './reducers'

export default (defaultState: any = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewareChain: any[] = [
        sagaMiddleware,
    ]

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger()
        middlewareChain.push(logger)
    }

    const store = createStore(
        combineReducers({
            ...reducers
        }),
        defaultState,
        applyMiddleware(...middlewareChain)
    )
    sagaMiddleware.run(fetchQuesionsSaga)

    return store
}