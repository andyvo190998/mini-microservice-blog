import React from 'react'

const CommentList = ({ comments }) => {

    const renderComment = Object.values(comments) || []
    return (
        <ul>
            {renderComment.map(comment => (
                <li key={comment.content}>{comment.content}</li>
            ))}
        </ul>
    )
}

export default CommentList