import React from 'react'
import { Question } from '../../data/types'
import TagList from './TagList'

const QuestionListItem = (props: Question) => {
    const {tags, title} = props

    return (
        <div className='mb-3'>
            <h3>{title}</h3>
            <div className='mb-2'>
                <TagList tags={tags}/>
            </div>
        </div>
    )
}

export default QuestionListItem