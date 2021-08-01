import React, { useState } from 'react'

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
        <button onClick={toggleDetailedView}>
          {detailedView ? 'hide' : 'show'}
        </button>
      </p>
      {detailedView ? (
        <>
          <p>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      ) : null}
      {showDelete ? <button onClick={handleDelete}>delete</button> : null}
    </div>
  )
}

export default Blog
