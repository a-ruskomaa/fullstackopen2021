import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, showDelete, deleteBlog }) => {
  const [detailedView, setDetailedView] = useState(false)

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
  }

  const handleLike = (event) => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    addLike(updatedBlog)
  }

  const handleDelete = (event) => {
    if (window.confirm('Delete blog?')) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog-item">
      <p>
        {blog.title} {blog.author}
        <button id={`blog-${blog.id}-button-toggle`} onClick={toggleDetailedView}>
          {detailedView ? 'hide' : 'show'}
        </button>
      </p>
      {detailedView ? (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button id={`blog-${blog.id}-button-like`} onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      ) : null}
      {showDelete ? <button id={`blog-${blog.id}-button-delete`} onClick={handleDelete}>delete</button> : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
