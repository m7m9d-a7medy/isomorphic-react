import { createStore, combineReducers, applyMiddleware } from 'redux'
import { identity } from 'lodash'

export default (defaultState: any = {
    test: "Test state"
}) => {
    const store = createStore(identity, defaultState, )
    return store
}