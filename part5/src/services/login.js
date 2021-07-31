import axios from 'axios'
const baseUrl = '/api/login'

const loginService = {
  login: async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    const user = response.data
    window.localStorage.setItem('user', JSON.stringify(user))
    return user
  },
  getFromLocalStorage: () => {
    const user = window.localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return null
    }
  },
}

export default loginService
