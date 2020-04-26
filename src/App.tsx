import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

interface BaseProps {}

const mapStateToProps = (state: any, props: BaseProps) => ({
    ...state
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = BaseProps & PropsFromRedux

const App = (props: Props) => {
    return (
        <div>
            <h1>Hello from App {props.test}</h1>
        </div>
    )
}

export default connector(App)