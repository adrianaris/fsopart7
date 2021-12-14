import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  const padding = {
    padding: 5
  }
  
  const footer = {
    padding: 15,
    borderStyle: 'solid',
    position: 'relative',
    top: 50
  }

  return (
    <div>
      <Notification /> 
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/createnew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
    <Switch>
      <Route path="/createnew">
        <AnecdoteForm />
      </Route>
      <Route path="/about">
        about
      </Route>
      <Route path="/">
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />   
      </Route>
    </Switch>
    </Router>
      <footer style={footer}>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/aytkt21009/129171256'>Fullstack whatever</a>. 
        See <a href="https://github.com/mluukkai/routed-anecdotes">https://github.com/mluukkai/routed-anecdotes</a> for the source code
      </footer>
    </div>
  )
}

export default App