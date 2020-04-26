import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Question } from '../../data/types'
import QuestionListItem from './QuestionListItem'

interface BaseProps { }

const mapStateToProps = (state: any, props: BaseProps) => ({
    questions: state.questions as Array<Question>,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = BaseProps & PropsFromRedux

const QuestionList = (props: Props) => {
    const { questions } = props

    let output: JSX.Element
    if (questions && questions.length) {
        output = (
            <div>
               {questions.map(q => (
                   <QuestionListItem
                    key={q.question_id}
                    {...q}
                   />
               ))}
            </div>
        )
    } else {
        output = (
            <div>
                ... Loading Questions ...
            </div>
        )
    }

    return output
}

export default connector(QuestionList)