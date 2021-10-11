export const showNotification = (message, type, time = 5) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(hideNotification()),
      time * 1000
    )
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { notification: { message, type }, timeoutId },
    })
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

const initialState = { notification: null, timeoutId: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    if (state.timeoutId) {
      clearTimeout(state.timeoutId)
    }
    return {
      notification: action.data.notification,
      timeoutId: action.data.timeoutId,
    }
  case 'HIDE_NOTIFICATION':
    return { notification: null, timeoutId: null }
  default:
    return state
  }
}

export default notificationReducer
