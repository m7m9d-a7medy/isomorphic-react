export interface Question {
    tags: Array<string>
    owner: {
        reputation: number,
        user_id: number,
        user_type: string,
        profile_image: string,
        display_name: string,
        link: string
    }
    is_answered: boolean
    view_count: number
    answer_count: number
    score: number
    last_activity_date: number
    creation_date: number
    question_id: number
    link: string
    title: string
    body: undefined | string
}

export interface StackoverflowResponse {
    items: Array<Question>
    has_more: boolean
    quota_max: number
    quota_remaining: number
}