import React, { useState, useEffect } from 'react'
import Blog from './blog/Blog'
import blogService from '../services/blogs'
import Blogform from './blogform/Blogform'

const Bloglist = ({ displayNotification, user }) => {
  const [blogs, setBlogs] = useState([])
  const [blogformVisible, setBlogformVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addNewBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      displayNotification('new blog added', 'info')
      toggleBlogformVisible()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const addLike = async (blog) => {
    const savedBlog = await blogService.update(blog)
    const updatedBlogs = blogs.map((blog) =>
      blog.id === savedBlog.id ? savedBlog : blog
    )
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (id) => {
    if (await blogService.delete(id)) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
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
        <button onClick={toggleBlogformVisible}>Add new blog</button>
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
