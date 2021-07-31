import axios from 'axios'
const baseUrl = '/api/blogs'

const blogService = {
  getAll: () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
  },
}

export default blogService
