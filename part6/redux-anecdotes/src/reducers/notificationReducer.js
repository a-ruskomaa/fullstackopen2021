export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { notification },
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer
