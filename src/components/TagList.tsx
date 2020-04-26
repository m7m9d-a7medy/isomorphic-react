import React from 'react'

interface Props {
    tags: Array<string>
}

const TagList = (props: Props) => {
    return (
        <div>
            {props.tags.map(t => <code key={t}>{t}</code>)}
        </div>
    )
}

export default TagList
