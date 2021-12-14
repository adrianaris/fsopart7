import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_A': {
      return action.data
    }
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(a => a.id !== id ? a : changedAnecdote)
    }
    case 'CREATE': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const newA = {...anecdote, votes: anecdote.votes + 1}
    const votedA = await anecdotesService.updateA(anecdote.id, newA)
    dispatch({
      type: 'VOTE',
      data: votedA
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    console.log(anecdotes)
    dispatch({
      type: 'INIT_A',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newA = await anecdotesService.addNew(content)
      dispatch({
        type: 'CREATE',
        data: newA 
      })
  }
}

export const sorted = (obj) => {
  return obj.sort((a, b) => (a.votes>b.votes) ? -1 : 1)
}

export default anecdotesReducer