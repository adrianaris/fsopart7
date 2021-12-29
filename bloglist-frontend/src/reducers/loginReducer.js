import blogService from '../services/blogs'

const loggedUser = window.localStorage.getItem('user')
const initState = loggedUser ? JSON.parse(loggedUser) : null

if(loggedUser) blogService.setToken(loggedUser.token)

const loginReducer = (state = initState, action) => {
  switch(action.type) {
  case 'LOG_IN':
    return action.user
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

export default loginReducer