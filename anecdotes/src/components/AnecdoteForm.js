import React, { useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const [redirect, setRedirect] = useState(false)
  const author = useField('text')
  const content = useField('text')
  const url = useField('text')

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = { content: content.value, 
      author: author.value, 
      url: url.value
    }
    props.createAnecdote(anecdote)
      .then(setRedirect(true))
    props.setNotification(`you created ${content.value}`, 10)
  }
  
  const reset = () => {
    content.onReset()
    author.onReset()
    url.onReset()
  }

  if (redirect) return <Redirect to="/anecdotes" />   

  return (
      <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote} onReset={() => reset()}>
      <div>content<input {...content}/></div> 
      <div>author<input {...author}/></div> 
      <div>url for more info<input {...url}/></div> 
      <button>create</button>
      <button type="reset">reset</button>
    </form>
      </>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)