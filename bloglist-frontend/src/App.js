import React, { useRef } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Toggable from './components/Toggable'
import Users from './components/Users'
import User from './components/User'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './actions/setNotification'
import { create } from './actions/blog'
import { logout } from './actions/login'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Button = styled.button`
padding: 0em 1em;
margin: 0.5em;
`
const Header = styled.header`
border: 1px solid;
background: Bisque;
`
const Blogapp = styled.h2`
margin: 1em;
`

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const addBlogFormRef = useRef()

  const addBlog = async (blog) => {
    addBlogFormRef.current.toggleVisibility()

    try {
      dispatch(create(blog))
    } catch (error) {
      dispatch(setNotification(`${error}`, 10, 'error'))
    }

    dispatch(setNotification(`a new blog ${blog.title}
      by ${blog.author} added`, 10, 'message'))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <Notification />
      {user===null
        ?
        <>
          <Blogapp>blogs app</Blogapp>
          <LoginForm />
        </>
        :
        <>
          <Router>
            <Header>
              <Link style={{ padding: 5 }} to="/">home</Link>
              <Link style={{ padding: 5 }} to="/users">users</Link>
              <b>{user.name} logged-in</b>
              <Button onClick={handleLogout}>logout</Button>
            </Header>
            <Blogapp>blogs app</Blogapp>
            <Routes>
              <Route path="/users/:name" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users" element={<Users />}/>
              <Route path="/"
                element={<>
                  <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
                    <AddBlogForm addBlog={addBlog} />
                  </Toggable>
                  <Blogs />
                </>}/>
            </Routes>
          </Router>
        </>
      }
    </>
  )
}

export default App