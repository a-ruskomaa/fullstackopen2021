import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
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
    </div>
  )
}

export default Blog
