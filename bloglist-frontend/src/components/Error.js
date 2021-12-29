import React from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)

  const notificationStyle = {
    color: 'red',
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

  return (
    <div style={notificationStyle} className='notification'>
      {notification}
    </div>
  )
}

export default Error