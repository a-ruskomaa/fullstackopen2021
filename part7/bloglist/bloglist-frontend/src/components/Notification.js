import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((store) => store.notification.notification)

  if (notification === null) {
    return null
  }

  const { message, type } = notification

  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification
