import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Blogform from './Blogform'

const Bloglist = ({ displayNotification }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addNewBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      displayNotification('new blog added', 'info')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return (
    <div>
      <Blogform addNewBlog={addNewBlog} />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Bloglist
