import axios from 'axios'
const baseUrl = '/api/blogs'

const blogService = {
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
    const config = {
      headers: { Authorization: this.token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  },
  update: async function (updatedObject) {
    const config = {
      headers: { Authorization: this.token },
    }

    const response = await axios.put(
      `${baseUrl}/${updatedObject.id}`,
      updatedObject,
      config
    )
    return response.data
  },
  delete: async function (id) {
    const config = {
      headers: { Authorization: this.token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.status === 204 ? true : false
  },
}

export default blogService
