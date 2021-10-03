export const showNotification = (notification) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { notification },
  }
}

const initialState = {
  notification: 'notification',
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export default notificationReducer
