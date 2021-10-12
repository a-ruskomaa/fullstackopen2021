import loginService from '../services/login'
import {
  showNotification
} from './notificationReducer'

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'LOGIN_SUCCESS',
        data: { user },
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        data: { error },
      })
      dispatch(showNotification('wrong credentials', 'error'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    await loginService.logout()
    dispatch({
      type: 'LOGOUT',
    })
    dispatch(showNotification('logged out', 'info'))
  }
}

const initialState = { user: loginService.getUserFromLocalStorage() }

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return {
      user: action.data.user
    }
  case 'LOGIN_FAILURE':
    return { user: null }
  case 'LOGOUT':
    return { user: null }
  default:
    return state
  }
}

export default loginReducer
