import blogService from '../services/blogs'
import baseActions from './baseActions'

const initialState = []

export const getAllBlogs = () => {
  return baseActions.getAll(blogService, 'GET_ALL')()
}

export const createBlog = (blog) => {
  return baseActions.create(blogService, 'CREATE')(blog)
}

export const updateBlog = (blog) => {
  return baseActions.update(blogService, 'UPDATE')(blog)
}

export const removeBlog = (id) => {
  return baseActions.remove(blogService, 'DELETE')(id)
}


const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE':
    const updatedBlog = action.data.updatedObject
    return state
      .map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      )
  case 'CREATE':
    return state.concat(action.data.object)
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  case 'GET_ALL':
    return action.data
  default:
    return state
  }
}

export default blogReducer
