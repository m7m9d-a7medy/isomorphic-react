import React from 'react'
import { Question } from '../../data/types'
import TagList from './TagList'
import { Link } from 'react-router-dom'

const QuestionListItem = (props: Question) => {
    const { tags, title, question_id } = props

    return (
        <div className='mb-3'>
            <h3>{title}</h3>
            <div className='mb-2'>
                <TagList tags={tags} />
            </div>
            <Link to={`/questions/${question_id}`}>
                <button>More info</button>
            </Link>
        </div>
    )
}

export default QuestionListItem