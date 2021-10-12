import blogService from '../services/blogs'
import baseActions from './baseActions'

const initialState = []

export const getAllBlogs = () => {
  return baseActions.getAll(blogService, 'GET_ALL_BLOGS')()
}

export const createBlog = (blog) => {
  return baseActions.create(blogService, 'CREATE_BLOG')(blog)
}

export const updateBlog = (blog) => {
  return baseActions.update(blogService, 'UPDATE_BLOG')(blog)
}

export const removeBlog = (id) => {
  return baseActions.remove(blogService, 'DELETE_BLOG')(id)
}


const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_BLOG':
    const updatedBlog = action.data.updatedObject
    return state
      .map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      )
  case 'CREATE_BLOG':
    return state.concat(action.data.object)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'GET_ALL_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer
