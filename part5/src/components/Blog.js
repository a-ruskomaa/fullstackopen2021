import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)

  const toggleDetailedView = () => {
    setDetailedView(!detailedView)
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
            <button>like</button>
          </p>
          <p>{blog.user.name}</p>
        </>
      ) : null}
    </div>
  )
}

export default Blog
