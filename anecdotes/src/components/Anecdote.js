import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Anecdote = (props) => {
    const id = useParams().id
    const anecdote = props.anecdotes.find(a => a.id === id)
    const handleClick = anecdote => {
        props.vote(anecdote)
        props.setNotification(`you voted for ${anecdote.content}`, 10)
    }
    return (
      <div>
          <h2>{anecdote.content}</h2>
          <div>
              has {anecdote.votes} votes
              <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
      </div>
    )    
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDipspatchToProps = {
    vote,
    setNotification,
}

const ConnectedAnecdote = connect(
    mapStateToProps,
    mapDipspatchToProps
)(Anecdote)

export default ConnectedAnecdote