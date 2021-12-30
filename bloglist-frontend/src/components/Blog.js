import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { like, del } from '../actions/blog'
import { setNotification } from '../actions/setNotification'

const Blog = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  const userName = useSelector(state => state.login.name)

  const dispatch = useDispatch()

  const handleDel = blog => {
    dispatch(del(blog))
    dispatch(setNotification(`you have deleted blog ${blog.title} by ${blog.author}`, 10, 'message'))
  }

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>
      <div>{blog.url}</div>
      <div>
        <span className="likesCounter">{blog.likes} likes</span>
        <button onClick={() => dispatch(like(blog))} className='likeButton'>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {(blog.user.name === userName) &&
          <button onClick={() => handleDel(blog)} className="removeButton">
              remove
          </button>
      }
    </>
  )
}

export default Blog