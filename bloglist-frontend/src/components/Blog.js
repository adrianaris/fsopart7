import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { like, del } from '../actions/blog'
import { setNotification } from '../actions/setNotification'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const hideDisplay = { display: visible ? 'none' : '' }
  const showDisplay = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDel= blog => {
    dispatch(del(blog))
    dispatch(setNotification(`you have deleted blog ${blog.title} by ${blog.author}`, 10, 'message'))
  }

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={hideDisplay} className='viewButton'>view</button>
        <button onClick={toggleVisibility} style={showDisplay} className='hideButton'>hide</button>
      </div>
      <div style={showDisplay}>
        <div>
          {blog.url}
        </div>
        <div>
          <span className='likesCounter'>likes: {blog.likes}</span>
          <button onClick={() => dispatch(like(blog))} className='likeButton'>like</button>
        </div>
        {blog.user &&
        <>
          <div>
            {blog.user.name}
          </div>
          {(blog.user.name === user.name) &&
          <button onClick={() => handleDel(blog)} className="removeButton">
        remove
          </button>
          }
        </>
        }
      </div>
    </div>
  )
}

export default Blog