import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PostList = () => {
    const [postList, setPostList] = useState([])

    useEffect(() => {
        const fetchPostList = async () => {
            await axios.get('http://localhost:4000/posts')
            .then((res) => {
                console.log(res.data)
                setPostList(res.data)
            })
            .catch(err => console.log(err))
        }
        fetchPostList()
    },[])
    const renderPost = Object.values(postList) || []
    return (
        <div>
            {renderPost.map(post => (
                <div className='card' style={{marginBottom: '8px', marginTop: '8px'}} key={post.id}>
                    <h1>{post.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default PostList