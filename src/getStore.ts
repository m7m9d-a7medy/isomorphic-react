import { createStore, combineReducers, applyMiddleware, StoreEnhancer } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import fetchQuesionsSaga from './sagas/fetch-questions.saga'
import * as reducers from './reducers'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { History } from 'history'

export default (history: History, defaultState: any = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const routerMiddleWareObj = routerMiddleware(history)

    const middlewareChain: any[] = [
        routerMiddleWareObj,
        sagaMiddleware,
    ]

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger()
        middlewareChain.push(logger)
    }

    const store = createStore(
        combineReducers({
            ...reducers,
            router: connectRouter(history),
        }),
        defaultState,
        applyMiddleware(...middlewareChain)
    )
    sagaMiddleware.run(fetchQuesionsSaga)

    return store
}