import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const errorStyle = {
    color: 'red',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notificationStyle = {
    color: 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification === null){
    return null
  }

  var style = notificationStyle
  if (notification.type === 'error') style = errorStyle

  return (
    <div style={style} className='notification'>
      {notification.content}
    </div>
  )
}

export default Notification