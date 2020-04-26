import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import getStore from './getStore'
import { Provider, ConnectedComponent } from 'react-redux'

const store = getStore()

const fetchDataForLocation = () => {
    store.dispatch({
        type: `REQUEST_FETCH_QUESTIONS`,
        questions: []
    })
}

const render = (_App: any) => {
    ReactDOM.render(
        <Provider store={store}>
            <_App />
        </Provider>,
        document.getElementById('AppContainer')
    )
}

render(App)
fetchDataForLocation()