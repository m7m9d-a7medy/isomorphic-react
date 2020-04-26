import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import QuestionList from './components/QuestionList'
import { Route, Link, RouterChildContext } from 'react-router-dom'
import QuestionDetail from './components/QuestionDetail'


interface BaseProps { }

const mapStateToProps = (state: any, props: BaseProps) => ({
    ...state
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = BaseProps & PropsFromRedux

const App = (props: Props) => {
    return (
        <div>
            <Link to='/'>
                <h1>Isomorphic react</h1>
            </Link>
            <Route exact path='/' component={QuestionList} />
            <Route exact path='/questions/:id' component={QuestionDetail} />
        </div>
    )
}

export default connector(App)