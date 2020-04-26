import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import getStore from './getStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const store = getStore(history)

const fetchDataForLocation = () => {
    store.dispatch({
        type: `REQUEST_FETCH_QUESTIONS`,
        questions: []
    })
}

const render = (_App: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <_App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('AppContainer')
    )
}

if (module.hot) {
    module.hot.accept('./App', () => {
        const nextApp = require('./App').default
        render(nextApp)
    })
}

store.subscribe(() => {
    const state = store.getState()
    if (state.questions.length > 0) {
        console.info('Mounting App')
        render(App)
    } else {
        console.info('App not yet mounting')
    }
})

fetchDataForLocation()