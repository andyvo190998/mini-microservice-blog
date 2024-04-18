import React from 'react'

const CommentList = ({ comments }) => {

    const renderComment = Object.values(comments) || []
    return (
        <ul>
            {renderComment.map(comment => {
                let content
                if (comment.status === 'approved') {
                    content = comment.content
                } else if (comment.status === 'pending') {
                    content = 'This comment is awaiting moderation'
                } else if (comment.status === 'rejected') {
                    content = 'This comment has been rejected'
                }

                return <li key={comment.content}>{content}</li>
            })}
        </ul>
    )
}

export default CommentList