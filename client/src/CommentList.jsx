import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CommentList = ({ postId }) => {
    const [commentList, setCommentPostList] = useState([])

    useEffect(() => {
        const fetchPostList = async () => {
            await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            .then((res) => {
                console.log(res.data)
                setCommentPostList(res.data)
            })
            .catch(err => console.log(err))
        }
        fetchPostList()
    },[])
    const renderComment = Object.values(commentList) || []
    return (
        <ul>
            {renderComment.map(comment => (
                <li key={comment.content}>{comment.content}</li>
            ))}
        </ul>
    )
}

export default CommentList