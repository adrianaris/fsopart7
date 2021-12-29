import userService from '../services/users'
import { setNotification } from './setNotification'
import blogService from '../services/blogs'

export const login = (username, password)=> {
    return async dispatch => {
        try {
            const user = await userService.login({ username, password })
            dispatch({
                type: 'LOG_IN',
                user: user
            })
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            blogService.setToken(user.token)
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 10, 'error'))
        }
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('user')
        dispatch({ type: 'LOG_OUT' })
    }
}