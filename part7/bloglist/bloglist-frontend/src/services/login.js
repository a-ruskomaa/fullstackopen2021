import axios from 'axios'
const baseUrl = '/api/login'

const loginService = {
  login: async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    const user = response.data
    window.localStorage.setItem('user', JSON.stringify(user))
    return user
  },
  logout: () => {
    window.localStorage.removeItem('user')
  },
  getUserFromLocalStorage: () => {
    const storedUser = window.localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  },
}

export default loginService
