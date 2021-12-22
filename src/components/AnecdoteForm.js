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
    console.log(anecdote)
    props.createAnecdote(anecdote)
      .then(setRedirect(true))
    props.setNotification(`you created ${content.value}`, 10)
  }
  
  const reset = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  if (redirect) return <Redirect to="/anecdotes" />   

  return (
      <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>content<input 
        type={content.type} 
        value={content.value}
        onChange={content.onChange}
        /></div> 
      <div>author<input 
        type={author.type}
        value={author.value}
        onChange={author.onChange}
          /></div> 
      <div>url for more info<input 
        type={url.type}
        value={url.value}
        onChange={url.onChange}
          /></div> 
      <button>create</button>
      <button type="button" onClick={() => reset()}>reset</button>
    </form>
      </>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)