import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import QuestionList from './components/QuestionList'

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
            <h1>Isomorphic react</h1>
            <QuestionList />
        </div>
    )
}

export default connector(App)