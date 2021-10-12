import React, { useState } from 'react'

const Blogform = ({ addNewBlog, toggleVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const saved = await addNewBlog(newBlog)
    if (saved) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a blog</h2>
      <div className="form-item">
        <label>
          title
          <input
            id="newblog-input-title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      <div className="form-item">
        <label>
          author
          <input
            id="newblog-input-author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>

      <div className="form-item">
        <label>
          url
          <input
            id="newblog-input-url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>

      <button id="newblog-button-cancel" onClick={toggleVisible}>cancel</button>
      <button id="newblog-button-save" type="submit">save</button>
    </form>
  )
}

export default Blogform
