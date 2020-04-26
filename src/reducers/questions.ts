import { unionWith } from 'lodash'
import { Question } from '../../data/types'
import { Action } from 'redux'

const questionEqualtity = (a: Question, b: Question) => {
    return a.question_id === b.question_id
}

export const questions = (state: Array<Question> = [], action: Action & { questions: Array<Question> }) => {
    switch(action.type) {
        case `FETCHED_QUESTIONS`:
            return unionWith(state, action.questions, questionEqualtity)
        default:
            return state
    }
} 