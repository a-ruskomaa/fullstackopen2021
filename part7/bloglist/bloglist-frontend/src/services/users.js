import axios from 'axios'
const baseUrl = '/api/users'

const userService = {
  token: null,
  setToken: function (newToken) {
    this.token = `bearer ${newToken}`
  },
  getAll: async function () {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
  },
  create: async function (newObject) {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  },
}

export default userService
