import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './blog/Blog'
import Blogform from './blogform/Blogform'
import {
  showNotification
} from '../reducers/notificationReducer'
import { createBlog, updateBlog, removeBlog } from '../reducers/blogReducer'

const Bloglist = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((store) => store.blogs)
  const [blogformVisible, setBlogformVisible] = useState(false)

  const addNewBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      dispatch(showNotification('new blog added', 'info'))
      toggleBlogformVisible()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const addLike = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
  }

  const toggleBlogformVisible = () => {
    setBlogformVisible(!blogformVisible)
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogformVisible ? (
        <Blogform
          addNewBlog={addNewBlog}
          toggleVisible={toggleBlogformVisible}
        />
      ) : (
        <button id='bloglist-button-new' onClick={toggleBlogformVisible}>Add new blog</button>
      )}
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
            showDelete={user.username === blog.user.username}
          />
        ))}
    </div>
  )
}

export default Bloglist
