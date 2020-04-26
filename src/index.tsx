import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const render = (_App: () => JSX.Element) => {
    ReactDOM.render(
        <_App />,
        document.getElementById('AppContainer')
    )
}

render(App)