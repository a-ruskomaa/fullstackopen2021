import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  hideNotification,
  showNotification,
} from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`voted: ${anecdote.content}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }
  return (
    <div>
      <Filter />
      <div>
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnecdoteList
