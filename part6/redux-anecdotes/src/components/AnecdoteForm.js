import React from 'react'
import { useDispatch } from 'react-redux'
import { insertAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const insert = (anecdote) => {
    dispatch(insertAnecdote(anecdote))
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
