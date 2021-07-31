import React, { useState } from 'react'

const Blogform = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addNewBlog(newBlog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a blog</h2>
      <div className="form-item">
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      <div className="form-item">
        <label>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>

      <div className="form-item">
        <label>
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>

      <button type="submit">save</button>
    </form>
  )
}

export default Blogform