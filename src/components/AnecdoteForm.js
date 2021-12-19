import React, { useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const [redirect, setRedirect] = useState(false)
    const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
      .then(setRedirect(true))
    props.setNotification(`you created ${content}`, 10)
  }

  if (redirect) return <Redirect to="/anecdotes" />   

  return (
      <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
      </>
  )
}

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)