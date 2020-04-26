import React from 'react'
import Markdown from 'react-markdown'
import TagList from './TagList'
import { connect, ConnectedProps } from 'react-redux'
import { Question } from '../../data/types'
import { RouteComponentProps } from 'react-router-dom'

interface BaseProps { }

const mapStateToProps = (state: { questions: Array<Question> }, props: BaseProps & RouteComponentProps) => {
    const { id } = props.match.params as any
    console.log({ id })
    console.log({
        q: state.questions.find(_q => _q.question_id == id)
    })

    return {
        ...(state.questions.find(_q => _q.question_id == id) as Question)
    }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type QuestionDetailProps = BaseProps & PropsFromRedux & RouteComponentProps

const QuestionDetail = (props: QuestionDetailProps) => {
    const { title, body, answer_count, tags } = props

    return (
        <div>
            <h3 className="mb-2">
                {title}
            </h3>
            {body
                ? <div>
                    <div className="mb-3">
                        <TagList tags={tags} />
                    </div>
                    <Markdown source={body} />
                    <div>
                        {answer_count} Answers
                </div>

                </div>
                :
                <div>
                    {/* If saga has not yet gotten question details, display loading message instead. */}
                    <h4>Loading Question...</h4>
                </div>
            }
        </div>
    )
}

export default connector(QuestionDetail)