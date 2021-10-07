import React from 'react'
import { useDispatch } from 'react-redux'
import { insertAnecdote } from '../reducers/anecdoteReducer'
import {
  hideNotification,
  showNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const insert = (content) => {
    dispatch(insertAnecdote(content))
    dispatch(showNotification(`added: ${content}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    insert(e.target.anecdote.value)
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
