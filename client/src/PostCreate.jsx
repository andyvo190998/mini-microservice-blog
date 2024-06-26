import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('http://posts.com/posts/create', {title})
        .then(res => {
            console.log(res)
            setTitle('')
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate