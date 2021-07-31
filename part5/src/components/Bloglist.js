import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Blogform from './Blogform'

const Bloglist = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addNewBlog = (blog) => {
    blogService.create(blog).then((savedBlog) => {
      setBlogs(blogs.concat(savedBlog))
    })
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
