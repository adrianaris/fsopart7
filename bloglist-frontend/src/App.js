import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Error from './components/Error'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Toggable from './components/Toggable'
import Container from '@material-ui/core/Container'

import { useDispatch } from 'react-redux'
import { setNotification } from './actions/setNotification'


const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      dispatch(setNotification('Wrong credentials', 10))
    }
  }

  const addBlogFormRef = useRef()

  const addBlog = async (blog) => {
    addBlogFormRef.current.toggleVisibility()

    try {
      await blogService.createBlog(blog)
    } catch (error) {
      dispatch(setNotification(`${error}`, 10))
    }

    const blogs = await blogService.getAll()

    setBlogs(blogs)
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 10))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const updBLog = async (id, newBlog) => {
    await blogService.updateBlog(id, newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const delBlog = async (blog) => {
    const deletedBlog = `blog ${blog.title} by ${blog.author} has been deleted`
    await blogService.deleteBlog(blog.id)

    const blogs = await blogService.getAll()

    setBlogs(blogs)
    dispatch(setNotification(`${deletedBlog}`, 10))
  }

  return (
    <Container>
      <h2>blogs</h2>
      <Error />
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
              addLike={(id, newBlog) => updBLog(id, newBlog)}
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