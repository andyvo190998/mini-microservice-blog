import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`http://posts.com/posts/${postId}/comments`, {content})
        .then(res => {
            console.log(res)
            setContent('')
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input value={content} onChange={(e) => setContent(e.target.value)} className='form-control' />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate