var timerId
const delay = (ms) => new Promise(resolve => timerId = setTimeout(resolve, ms*1000))

export const setNotification = (content, timer, type) => {
  return async dispatch => {
    clearTimeout(timerId)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: content,
        type: type
      }
    })
    await delay(timer)
    dispatch({
      type: 'REMOVE_NOTIFICATION'
    })
  }
}