import userService from '../services/users'
import baseActions from './baseActions'

const initialState = []

export const getAllUsers = () => {
  return baseActions.getAll(userService, 'GET_ALL_USERS')()
}

export const createUser = (user) => {
  return baseActions.create(userService, 'CREATE_USER')(user)
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_USER':
    return state.concat(action.data.object)
  case 'GET_ALL_USERS':
    return action.data
  default:
    return state
  }
}

export default userReducer
