import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Toggable from './components/Toggable'
import Container from '@material-ui/core/Container'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './actions/setNotification'
import { initBlogs, create, like, del  } from './actions/blog'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 10, 'error'))
    }
  }

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
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const updBLog = blog => dispatch(like(blog))

  const delBlog = blog => {
    dispatch(del(blog))
    const deletedBlog = `blog ${blog.title} by ${blog.author} has been deleted`
    dispatch(setNotification(`${deletedBlog}`, 10, 'message'))
  }

  return (
    <Container>
      <h2>blogs</h2>
      <Notification />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
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
              blog={blog}
              addLike={blog => updBLog(blog)}
              user={user}
              handleDeleteBlog={() => delBlog(blog)}
            />
          )}
        </>
      }
    </Container>
  )
}

export default App