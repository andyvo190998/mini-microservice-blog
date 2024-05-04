import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [postList, setPostList] = useState([])

    useEffect(() => {
        const fetchPostList = async () => {
            await axios.get('http://posts.com/posts')
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
                    <div className="card-body">
                        <h3>{post.title}</h3>
                        <CommentCreate postId={post.id} />
                        <CommentList comments={post.comments} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostList