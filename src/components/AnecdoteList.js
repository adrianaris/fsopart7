import React from "react"
import { connect } from "react-redux"
import { vote, sorted } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
    const filter = props.filter
    const anecdotes = sorted(props.anecdotes)
    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    const handleClick = anecdote => {
      props.vote(anecdote)
      props.setNotification(`you voted for ${anecdote.content}`, 10)
    }
    return (
        <>
        {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleClick(anecdote)}>vote</button>
              </div>
            </div>
        )}
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList