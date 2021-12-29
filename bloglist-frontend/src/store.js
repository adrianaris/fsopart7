import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  login: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store