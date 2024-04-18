import React from 'react'

const CommentList = ({ comments }) => {

    const renderComment = Object.values(comments) || []
    return (
        <ul>
            {renderComment.map(comment => {
                let content
                const status = comment.status
                switch (status) {
                    case 'approved':
                        content = comment.content
                        break;
                    case 'pending':
                        content = 'This comment is awaiting moderation'
                        break;
                    case 'rejected':
                        content = 'This comment has been rejected'
                        break
                    default:
                        content = 'This content has not been moderated'
                }
                return <li key={comment.content}>{content}</li>
            })}
        </ul>
    )
}

export default CommentList