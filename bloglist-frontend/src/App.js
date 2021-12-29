import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Toggable from './components/Toggable'
import Container from '@material-ui/core/Container'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './actions/setNotification'
import { initBlogs, create } from './actions/blog'
import { logout } from './actions/login'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const addBlogFormRef = useRef()

  const addBlog = async (blog) => {
    addBlogFormRef.current.toggleVisibility()

    try {
      dispatch(create(blog))
    } catch (error) {
      dispatch(setNotification(`${error}`, 10, 'error'))
    }
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 10, 'message'))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Container>
      <h2>blogs</h2>
      <Notification />
      {user===null ?
        <LoginForm
        /> :
        <>
          <h4>{user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </h4>
          <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
            <AddBlogForm
              addBlog={addBlog}
            />
          </Toggable>
        {blogs.map(blog =>
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
            />
        )}
        </>
      }
    </Container>
  )
}

export default App