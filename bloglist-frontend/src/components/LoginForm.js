import React, { useState } from 'react'
import { login } from '../actions/login'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }


  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm