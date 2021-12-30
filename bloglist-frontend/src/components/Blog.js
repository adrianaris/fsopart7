import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { like, del, comment } from '../actions/blog'
import { setNotification } from '../actions/setNotification'

const Blog = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  const userName = useSelector(state => state.login.name)

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const handleDel = blog => {
    dispatch(del(blog))
    dispatch(setNotification(`you have deleted blog ${blog.title} by ${blog.author}`, 10, 'message'))
  }

  const addComment = event => {
    event.preventDefault()
    dispatch(comment(blog.id, message))
    setMessage('')
  }

  if(!blog) return null

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
      <form onSubmit={addComment}>
        <input
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)}
        /><button>comment</button>
      </form>
      <ul>
        {blog.comments.map(com =>
          <li key={Math.random()}>{com}</li>
        )}
      </ul>
    </>
  )
}

export default Blog